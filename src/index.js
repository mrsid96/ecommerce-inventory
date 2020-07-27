const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fastify = require('fastify')({
    logger: true
});

const config = require("./config/config");
const swagger = require("./config/swagger");

//Including Routes
const accountRoutes = require("./accounts/accounts.route");
const inventoryRoutes = require("./inventory/inventory.route");
const orderRoutes = require("./orders/order.route");

//Adding Swagger UI
fastify.register(require('fastify-swagger'), swagger);

// Binding all routes
[...accountRoutes, ...inventoryRoutes, ...orderRoutes].forEach((route, index) => {
    fastify.route(route)
})

//Adding Fallback
fastify.setNotFoundHandler((request, reply) => {
    reply.code(403).type('application/json').send({
        statusCode: 403,
        status: 403,
        message: "Forbidden"
    })
})


// Running the application in a cluster
if (cluster.isMaster && numCPUs > 2) {
    fastify.log.info(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs - 2; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        fastify.log.info(`Worker ${worker.process.pid} died`);
    });
} else {
    fastify.listen(config.getApplicationConfig().port, config.getApplicationConfig().host, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.swagger();
        fastify.log.info(`Environment is:' ${process.env.NODE_ENV || "default"}'`)
        fastify.log.info(`server listening on ${address}`)
        fastify.log.info(`Browse your REST API at %s%s ${address}/documentation`)
    })
}