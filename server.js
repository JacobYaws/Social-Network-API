const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});



// const express = require('express');
// const mongodb = require('mongodb').MongoClient;
// const db = require('./config/connection');



// const connectionStringURI = `mongodb://127.0.0.1:27017/socialDB`;

// let db;

// mongodb.connect(
//   connectionStringURI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (err, client) => {
//     db = client.db();
//     app.listen(port, () => {
//       console.log(`Example app listening at http://localhost:${port}`);
//     });
//   }
// );

// app.use(express.json());

// app.post('/create', (req, res) => {
//   db.collection('userCollection').insertOne(
//     { first_name: req.body.first_name, last_name: req.body.last_name },
//     (err, results) => {
//       if (err) throw err;
//       res.json(results);
//     }
//   );
// });

// app.get('/users', (req, res) => {
//   // Use db connection to find all documents in collection
//   db.collection('userCollection')
//     .find()
//     .toArray((err, results) => {
//       if (err) throw err;
//       res.send(results);
//     });
// });
