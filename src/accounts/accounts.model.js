const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /^[a-zA-Z .]{2,80}$/
    },
    email: {
        unique: true,
        type: String,
        required: true,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        unique: true,
        type: Number,
        required: true,
        validate: /^[6-9]\d{9}$/
    },
    address: [
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
    ]
}, { timestamps: { updatedAt: "lastUpdatedAt" } });

module.exports = mongoose.model('Accounts', accountSchema);