const express = require('express')
const dotenv= require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

// or as an es module:
// import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb+srv://arisepawan:@Pawan1213@cluster0.o7stngr.mongodb.net/?appName=Cluster0';
const client = new MongoClient(url);
// Database Name
const dbName = 'passop';


const app = express()
app.use(bodyParser.json())
app.use(cors())


client.connect();

//get all password
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save Pasword
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.insertOne(password);
  res.send({success: true , result: findResult})
})

//delete a Password 
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('Passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true , result: findResult})
})


