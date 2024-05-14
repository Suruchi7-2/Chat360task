const { connectToDatabase } = require('./db_connection'); // Import connection function

async function writeLog(source, level, message) {
    const formattedLog = {
        timestamp: moment().format(),
        level,
        source,
        message,
    };

    try {
        const db = await connectToDatabase(); // Connect to database
        const collection = db.collection("logs"); // Replace with your collection name
        await collection.insertOne(formattedLog);
    } catch (error) {
        console.error("Error writing log to database:", error);
        // Handle error (e.g., retry connection or log to a backup file)
    }
}

// ... Rest of your code (API integrations and calls to writeLog)

// Simulate API calls and write logs (replace with your actual API calls)
api_userManagement();
api_paymentProcessing();
// ... Call other API functions