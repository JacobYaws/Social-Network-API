const { connect, connection } = require('mongoose');

// Establishes the connection to the Mongo database (socialDB)
connect('mongodb://127.0.0.1:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true
});

module.exports = connection;