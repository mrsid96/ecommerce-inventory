
const boom = require('@hapi/boom');
const db = require("./../../middlewares/db.middleware");
const Order = db.Order;
const Inventory = db.Inventory;
const mongoose = require("mongoose");

/*
1. Add Order
2. Update Status
3. Cancel Order
4. View Order Details By Id
5. View all orders of a account
*/

let addOrder = async (req, res) => {
    try {
        //Check if Inventory item exists
        const item = await Inventory.findById(req.body.inventoryItem, { stockCount: 1 });

        //Proceed adding order if stocks left
        if (item.stockCount > 0) {
            const order = new Order({
                ...req.body,
                summary: {
                    status: "Ready to ship",
                    location: "Bangalore Warehouse",
                    time: Date.now()
                },
                orderStatus: "initiated"
            })

            //Updating the inventory
            await Inventory.findByIdAndUpdate(req.body.inventoryItem,
                {
                    $inc: {
                        stockCount: -1
                    }
                });
            return order.save();
        } else {
            throw Error("No Items left in the inventory!");
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}

let updateSummary = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            $push: {
                summary: {
                    ...req.body,
                    time: Date.now()
                }
            }
        }, { new: true });
        return order;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let cancelOrder = async (req, res) => {
    try {
        let cancellationDetails = {
            ...req.body
        }
        if (!cancellationDetails.cancellationReason || !cancellationDetails.cancellationAction)
            throw Error("Invalid Cancellation Request!");

        //Checking if order already canceled
        const exitingOrder = await Order.findById(req.params.id);

        if (exitingOrder.orderStatus == "canceled")
            throw Error("Order is already canceled!");
        // Updating orders
        const order = await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: "canceled",
            ...cancellationDetails,
            $push: {
                summary: {
                    status: `Initiating ${cancellationDetails.cancellationAction}`,
                    time: Date.now()
                }
            }
        }, { new: true });

        //Putting the same item back to Inventory
        await Inventory.findByIdAndUpdate(order.inventoryItem,
            {
                $inc: {
                    stockCount: 1
                }
            });

        return order;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let viewOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        return order;
    } catch (err) {
        throw boom.boomify(err)
    }
}

let viewAllOrdersOfAccount = async (req, res) => {
    try {
        const curSkip = parseInt(req.params.pageNumber) == 0 ? 0 : (parseInt(req.params.itemsPerPage) * (parseInt(req.params.pageNumber) - 1));
        const limit = parseInt(req.params.itemsPerPage);
        const orders = await Order.find({
            buyer: mongoose.mongo.ObjectId(req.params.id)
        }).sort({ _id: -1 }).skip(curSkip).limit(limit);
        return orders;
    } catch (err) {
        throw boom.boomify(err)
    }
}

let buySameItemAgain = async (req, res) => {
    try {
        const exitingOrder = await Order.findOne({
            "_id": mongoose.mongo.ObjectId(req.body.orderId),
            "buyer": mongoose.mongo.ObjectId(req.params.id)
        });
        if (exitingOrder.orderStatus == "canceled") {
            throw Error("Cannot reorder a cancelled order!");
        }
        else if (exitingOrder) {
            //Check if Inventory item exists
            const item = await Inventory.findById(exitingOrder.inventoryItem, { stockCount: 1 });

            //Proceed adding order if stocks left
            if (item.stockCount > 0) {
                const {
                    buyer, inventoryItem, paymentMode, shippingAddress, amountPaid
                } = { ...exitingOrder.toObject() };
                console.log({ buyer, inventoryItem, paymentMode, shippingAddress, amountPaid });
                let order = new Order({
                    buyer,
                    inventoryItem,
                    paymentMode,
                    amountPaid,
                    shippingAddress: req.body.shippingAddress || shippingAddress,
                    summary: {
                        status: "Ready to ship",
                        location: "Bangalore Warehouse",
                        time: Date.now()
                    },
                    orderStatus: "initiated"
                })

                //Updating the inventory
                await Inventory.findByIdAndUpdate(exitingOrder.inventoryItem,
                    {
                        $inc: {
                            stockCount: -1
                        }
                    });
                return order.save();
            } else {
                throw Error("No Items left in the inventory!");
            }
        } else {
            throw Error("No Order found!");
        }
    } catch (err) {
        throw boom.boomify(err)
    }
}

module.exports = {
    addOrder,
    updateSummary,
    cancelOrder,
    viewOrderById,
    viewAllOrdersOfAccount,
    buySameItemAgain
}