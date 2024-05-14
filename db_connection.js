const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("your_database_name"); // Replace with your database name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Re-throw error for handling in `log_injector.js`
    }
}

module.exports = { connectToDatabase };