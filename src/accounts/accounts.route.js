const accountController = require("./accounts.controller");
const orderController = require("./../orders/order.controller");

const routes = [
    {
        method: 'GET',
        url: '/api/account/:id',
        handler: accountController.getAccountDetails
    },
    {
        method: 'POST',
        url: '/api/account',
        handler: accountController.addAccount,
    },
    {
        method: 'POST',
        url: '/api/account/:id/address',
        handler: accountController.addAddress,
    },
    {
        method: 'PATCH',
        url: '/api/account/:id',
        handler: accountController.updatePIData
    },
    {
        method: 'PATCH',
        url: '/api/account/:id/address/:addressId',
        handler: accountController.updateAddress
    },
    {
        method: 'DELETE',
        url: '/api/account/:id',
        handler: accountController.deleteAccount
    },
    {
        method: 'DELETE',
        url: '/api/account/:id/address/:addressId',
        handler: accountController.deleteAddress
    }, 
    {
        method: 'GET',
        url: '/api/account/:id/orders/:itemsPerPage/:pageNumber',
        handler: orderController.viewAllOrdersOfAccount
    },
    {
        method: 'POST',
        url: '/api/account/:id/orderAgain',
        handler: orderController.buySameItemAgain,
    }
]

module.exports = routes;