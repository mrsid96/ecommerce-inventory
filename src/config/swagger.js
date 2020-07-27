const options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Ecommerce Inventory',
            description: 'NodeJS web application which creates Orders for an ecommerce flow. The application consist of Orders, Account, and Inventory collections.',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://sidharthpatnaik.in',
            description: 'Find more about author.'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
}
module.exports = options;