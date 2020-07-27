
const orderController = require("./order.controller");

const routes = [
    {
        method: 'GET',
        url: '/api/order/:id',
        handler: orderController.viewOrderById
    }, {
        method: 'PATCH',
        url: '/api/order/:id',
        handler: orderController.updateSummary
    }, {
        method: 'POST',
        url: '/api/order/:id/cancel',
        handler: orderController.cancelOrder
    }, {
        method: 'POST',
        url: '/api/order',
        handler: orderController.addOrder
    }
]

module.exports = routes;