const boom = require('@hapi/boom');
const mongoose = require('mongoose')
const db = require("./../../middlewares/db.middleware");
const Account = db.Account;

/*
1. Add new account
2. Delete account
3. Get details of an account
4. Update Account
    a. add address
    b. update address
    c. update PI Data
    d. delete address
5. Buy same order
*/

let addAccount = async (req, res) => {
    try {
        const account = new Account(req.body)
        return account.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

let deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndRemove(req.params.id)
        return account;
    } catch (err) {
        throw boom.boomify(err)
    }
}

let getAccountDetails = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id)
        return account
    } catch (err) {
        throw boom.boomify(err)
    }
}

let addAddress = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, {
            $push: {
                address: req.body
            }
        }, { new: true });
        return account;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let updatePIData = async (req, res) => {
    try {
        let piData = req.body;
        delete piData.address;
        console.log(piData);
        const account = await Account.findByIdAndUpdate(req.params.id, piData, { upsert: true, new: true });
        return account;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let deleteAddress = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, {
            $pull: {
                address: { "_id": mongoose.mongo.ObjectId(req.params.addressId) }
            }
        }, { new: true });
        return account;
    } catch (err) {
        throw boom.boomify(err);
    }
}

let updateAddress = async (req, res) => {
    try {
        let dataToUpdate = {};
        for (let key in req.body) {
            dataToUpdate[`address.$.${key}`] = req.body[key]
        }
        const account = await Account.updateOne({
            "address._id": mongoose.mongo.ObjectId(req.params.addressId)
        }, {
            ...dataToUpdate
        }, { upsert: true, new: true });
        return account;
    } catch (err) {
        throw boom.boomify(err);
    }
}

module.exports = {
    addAccount,
    deleteAccount,
    getAccountDetails,
    addAddress,
    updatePIData,
    deleteAddress,
    updateAddress,
}

