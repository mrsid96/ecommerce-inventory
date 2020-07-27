const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z .]{2,80}$/
    },
    productImages: {
        type: Array,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    reviews: [
        {
            accountId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            review: String
        }
    ],
    seller: {
        ownerName: {
            type: String,
            required: true,
            validate: /^[a-zA-Z .]{2,80}$/
        },
        ownerPhone: {
            type: Number,
            required: true,
            validate: /^[6-9]\d{9}$/
        },
        ventureName: {
            type: String,
            required: true,
            validate: /^[a-zA-Z .-]{2,120}$/
        },
        address:
        {
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
    }
}, { timestamps: { updatedAt: "lastUpdatedAt" } });

module.exports = mongoose.model('Inventory', inventorySchema);