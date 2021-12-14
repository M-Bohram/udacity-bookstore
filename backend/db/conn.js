const { MongoClient } = require('mongodb');
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('bookstore');
      console.log('Successfully connected to MongoDB.');
      db.db('bookstore').collection('books').createIndex({ title: "text", authors: "text" })

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
