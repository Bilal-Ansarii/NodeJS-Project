const { MongoClient, ObjectId } = require("mongodb");

let dbConnection;
const uri =
  "mongodb+srv://<username>:<password>@<yourDatabaseName>/<collectionName>"; // Replace with your connection string

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err); // Pass the error to the callback
      });
  },
  getDb: () => dbConnection,
};
