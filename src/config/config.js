const appConfigs = {
    "local": {
        port: 3000,
        host: "localhost",
        mongoUser: "",
        mongoPassword: "",
        mongoPort: 27017,
        mongoHost: "localhost",
        mongoDBName: "ecommerce-inventory"
    }
}

const getApplicationConfig = () => {
    return appConfigs[process.env.NODE_ENV || "local"];
};

const getConnectionString = () => {
    let currentScope = appConfigs[process.env.NODE_ENV || "local"];
    if (currentScope.mongoPassword && currentScope.mongoUser) {
        return `mongodb://${currentScope.mongoUser}:${currentScope.mongoPassword}@${currentScope.mongoHost}:${currentScope.mongoPort}/${currentScope.mongoDBName}?authSource=admin`;
    } else {
        return `mongodb://${currentScope.mongoHost}:${currentScope.mongoPort}/${currentScope.mongoDBName}?authSource=admin`;
    }

}
module.exports = {
    getApplicationConfig,
    getConnectionString
}