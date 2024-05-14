const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; // For database connection

// Replace with your actual connection details
const uri = "mongodb://localhost:27017";
const databaseName = "your_database_name"; // Replace with your database name
const collectionName = "logs"; // Replace with your collection name

const app = express();
const port = 3000;

// Connect to the MongoDB database
async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        return client.db(databaseName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit application on connection error
    }
}

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Search endpoint for filtering logs
app.post('/search', async(req, res) => {
    const { query, filter } = req.body; // Get search query and filter object from request body

    // Build query based on user input
    let searchCriteria = {};
    if (query) {
        searchCriteria.$text = { $search: query }; // Full-text search across all fields
    }
    if (filter) {
        searchCriteria[filter.field] = filter.value; // Filter by specific field
    }

    try {
        const db = await connectToDatabase();
        const logsCollection = db.collection(collectionName);

        // Find logs matching the search criteria
        const cursor = logsCollection.find(searchCriteria);

        // Optionally add sorting or pagination here (e.g., .sort({ timestamp: -1 }).limit(10))

        const results = await cursor.toArray(); // Convert cursor to array of results

        res.json(results); // Send filtered logs as JSON response
    } catch (error) {
        console.error("Error searching logs:", error);
        res.status(500).send({ error: "Internal Server Error" }); // Handle errors gracefully
    }
});

app.listen(port, () => {
    console.log(`Query Interface listening on port ${port}`);
});