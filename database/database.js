
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://rohankharate27112003:gNGKyX4aVhmyfelV@cluster0.ortc4si.mongodb.net/';
const client = new MongoClient(url);

// Database Name 
const dbName = 'NAME';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('TABLE');

  // the following code examples can be pasted here...


     const data = 
     { 
        "rohan": "kharate",
     "pratham": "ingle", 
     "suryal": "kohinoor"  };

  const insertResult = await collection.insertMany([data]);
  console.log('Inserted documents =>', insertResult);

  return 'done.';

  
    
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());