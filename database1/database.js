


// mongodb+srv://rohankharate27112003:mfAHGbWREMxGpb2z@project52.ypxyn1i.mongodb.net/

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://rohankharate27112003:mfAHGbWREMxGpb2z@project52.ypxyn1i.mongodb.net/';
 
const client = new MongoClient(url);

// Database Name
const dbName = 'db_name11';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('collection_name11');

  // the following code examples can be pasted here...


  const data = {
    "r1": "b1",
    "r2": "b2",
    "r3": "b3",
    "r4": "b4"
  };
  const insertResult = await collection.insertMany([data]);
console.log('Inserted documents =>', insertResult);



const findResult = await collection.find({data}).toArray();
console.log('Found documents =>', findResult);


const filteredDocs = await collection.find( { data}).toArray();
console.log('Found documents filtered by { a: 3 } =>', filteredDocs);



  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());