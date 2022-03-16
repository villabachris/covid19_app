// import required packages and data
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

// define initial database instance
let database = null;

// create the in-memory instance of MongoDB
const mongo = new MongoMemoryServer();

async function startDatabase() {
    const MongoDBURL = await mongo.getConnectionString();
    const connection = await MongoClient.connect(MongoDBURL, {
        useNewUrlParser: true,
        UseUnifiedTopology: true
    });

    // Seed Database
    if (!database) {
        database = connection.db();
        await database.collection("locations").insertMany(data.Locations);
    }

    return database;

}

async function stopDatabase() {
    await mongo.stop();
}

module.exports = {
    startDatabase,
    stopDatabase
}



