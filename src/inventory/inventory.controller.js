const boom = require('@hapi/boom');
const db = require("./../../middlewares/db.middleware");
const Inventory = db.Inventory;

/*
1. Add item to Inventory
2. Update Item in Inventory
3. Add reviews against the item
4. Get reviews of the item
5. Search Inventory by tags, category, name
6. Get details by Id
7. Delete inventory item
*/

let addItemToInventory = async (req, res) => {
    try {
        const item = new Inventory(req.body)
        return item.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

let deleteItemFromInventory = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndRemove(req.params.id)
        return item;
    } catch (err) {
        throw boom.boomify(err)
    }
}

let getItemDetails = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id)
        return item
    } catch (err) {
        throw boom.boomify(err)
    }
}

let updateItemDetails = async (req, res) => {
    try {
        let dataToUpdate = req.body;
        delete dataToUpdate.seller;
        delete dataToUpdate.reviews;
        const item = await Inventory.findByIdAndUpdate(req.params.id, {
            ...dataToUpdate
        }, { new: true });
        return item
    } catch (err) {
        throw boom.boomify(err)
    }
}

let addReviewToItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, {
            $push: {
                reviews: req.body
            }
        }, { new: true });
        return item;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let viewReviewsOfItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id, { reviews: 1 });
        return item;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let searchForItems = async (req, res) => {
    try {
        let dataToSearch = {}
        switch (req.params.searchField) {
            case "name":
            case "category":
                dataToSearch[req.params.searchField] = new RegExp(req.params.searchString, 'i');
                return await Inventory.find(dataToSearch);
            case "tags":
                dataToSearch[req.params.searchField] = req.params.searchString;
                return await Inventory.find(dataToSearch);
            default:
                throw Error("Invalid search parameter!");
        }
    } catch (err) {
        throw boom.boomify(err);
    }
}

module.exports = {
    addItemToInventory,
    deleteItemFromInventory,
    getItemDetails,
    updateItemDetails,
    addReviewToItem,
    viewReviewsOfItem,
    searchForItems
}