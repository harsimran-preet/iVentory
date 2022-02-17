const mongoose = require("mongoose");
const dotenv = require("dotenv");

async function connectDb() {
  dotenv.config();
  await mongoose
    .connect(
      "mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@iventory.qy1fb.mongodb.net/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",
      // "mongodb://localhost:27017/users",
      {
        useNewUrlParser: true, //useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .catch((error) => console.log(error));
}

// If the Node process ends, close the Mongoose connection
async function closeDbConnection() {
  await mongoose.connection.close();
}

const database = {};
database.database = mongoose;
database.connectDb = connectDb;
database.closeDbConnection = closeDbConnection;
database.ObjectId = mongoose.Types.ObjectId;

module.exports = database;
