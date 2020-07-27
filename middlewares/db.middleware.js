const mongoose = require('mongoose');
const config = require("../src/config/config");

mongoose.connect(config.getConnectionString(), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

module.exports = {
    Inventory: require("./../src/inventory/inventory.model"),
    Account: require("./../src/accounts/accounts.model"),
    Order: require("./../src/orders/order.model"),
};