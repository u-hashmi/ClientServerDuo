const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
require('dotenv').config();
const { client } = require('../db/database');
const DATABASE_NAME = "Financer";
const MAIN_COLLECTION_NAME = "SpendingData";
const LOAN_COLLECTION_NAME = "LoanData";

// Insert data route
router.post('/insertData', async (req, res) => {
  const newData = req.body;

  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(MAIN_COLLECTION_NAME);

    const result = await collection.insertOne(newData);
    console.log(`Inserted new data with ID: ${result.insertedId}`);

    const insertedData = await collection.findOne({ _id: result.insertedId }); // Retrieve the inserted data
    res.status(201).json(insertedData); // Return the inserted data
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/getCollection', async (req, res) => {
    try {
      const database = client.db(DATABASE_NAME);
      const collection = database.collection(MAIN_COLLECTION_NAME);
  
      const collectionData = await collection.find({}).toArray();
      res.status(200).json(collectionData);
    } catch (err) {
      console.error('Error fetching collection data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/deleteData/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(MAIN_COLLECTION_NAME);
    console.log("Here");
    const result = await collection.deleteOne({ _id: new ObjectId(id)});
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/updateData/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(MAIN_COLLECTION_NAME);
    const objectId = new ObjectId(id);
    const { _id, ...updatedDataWithoutId } = updatedData; 
    const result = await collection.updateOne({ _id: objectId }, { $set: updatedDataWithoutId  });
    console.log(updatedDataWithoutId);
    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Insert data route for LoanData
router.post('/insertLoanData', async (req, res) => {
  const newLoanData = req.body;

  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(LOAN_COLLECTION_NAME);

    const result = await collection.insertOne(newLoanData);
    console.log(`Inserted new loan data with ID: ${result.insertedId}`);

    const insertedData = await collection.findOne({ _id: result.insertedId }); // Retrieve the inserted data
    res.status(201).json(insertedData); // Return the inserted data
  } catch (err) {
    console.error('Error inserting loan data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all data from LoanData collection
router.get('/getLoanDataCollection', async (req, res) => {
    try {
      const database = client.db(DATABASE_NAME);
      const collection = database.collection(LOAN_COLLECTION_NAME);
  
      const collectionData = await collection.find({}).toArray();
      res.status(200).json(collectionData);
    } catch (err) {
      console.error('Error fetching loan collection data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete data from LoanData collection
router.delete('/deleteLoanData/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(LOAN_COLLECTION_NAME);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Loan data deleted successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error('Error deleting loan data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update data in LoanData collection
router.put('/updateLoanData/:id', async (req, res) => {
  const { id } = req.params;
  const updatedLoanData = req.body;

  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection(LOAN_COLLECTION_NAME);
    
    const { _id, ...updatedDataWithoutId } = updatedLoanData;
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedDataWithoutId });

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Loan data updated successfully' });
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error('Error updating loan data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Export the router
module.exports = router;




module.exports = router;
