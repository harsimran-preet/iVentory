const mongoose = require('mongoose');
const userModel = require("./models/user");
const inventoryModel = require("./models/inventory");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@iventory.stknh.mongodb.net/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getUsers() {
  let result = await userModel.find();
  return result;
};

exports.getUsers = getUsers;
