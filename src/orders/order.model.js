
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    summary: [
        {
            status: {
                type: String,
                required: true,
            },
            location: String,
            time: {
                type: String,
                required: true,
            }
        }
    ],
    orderStatus: String,
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    inventoryItem: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    paymentMode: {
        type: String,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: String,
        landmark: String,
        pincode: {
            type: Number,
            validate: /^[1-9]\d{5}$/,
            required: true
        }
    }

}, { timestamps: { updatedAt: "lastUpdatedAt" }, strict: false });

module.exports = mongoose.model('Orders', orderSchema);