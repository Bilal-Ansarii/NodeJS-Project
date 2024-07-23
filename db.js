const { MongoClient, ObjectId } = require("mongodb");

let dbConnection;
const uri =
  "mongodb+srv://mohammadbilalcse:adev64uhdZlTL5zB@book-directory-clustor.mija9fe.mongodb.net/bookstore";

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
