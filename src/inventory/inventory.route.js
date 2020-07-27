const inventoryController = require("./inventory.controller");

const routes = [
    {
        method: 'GET',
        url: '/api/items/:id',
        handler: inventoryController.getItemDetails
    }, {
        method: 'POST',
        url: '/api/items',
        handler: inventoryController.addItemToInventory
    }, {
        method: 'DELETE',
        url: '/api/items/:id',
        handler: inventoryController.deleteItemFromInventory
    }, {
        method: 'PATCH',
        url: '/api/items/:id',
        handler: inventoryController.updateItemDetails
    }, {
        method: 'POST',
        url: '/api/items/:id/review',
        handler: inventoryController.addReviewToItem
    }, {
        method: 'GET',
        url: '/api/items/:id/review',
        handler: inventoryController.viewReviewsOfItem
    }, {
        method: 'GET',
        url: '/api/items/:searchField/:searchString',
        handler: inventoryController.searchForItems
    }
];

module.exports = routes;