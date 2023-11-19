const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGODB_URI = "mongodb+srv://hashdesigndevelop:2NOMJpZivzwphcwb@cluster0.4gzigyf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function databaseConnection() {
  try {
    await client.connect(); 
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

module.exports = { databaseConnection, client };