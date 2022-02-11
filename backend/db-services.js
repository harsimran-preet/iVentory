const mongoose = require("mongoose");
const User = require("./models/user");
const Inventory = require("./models/inventory");
const dotenv = require("dotenv");

dotenv.config();
mongoose
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

/********************************
 *  User functions
 ********************************/
async function getUsers() {
  return await User.find();
}

/********************************
 *  Inventory functions
 ********************************/
async function getInventories() {
  return await Inventory.find();
}

async function createInventory(data) {
  const inventory = new Inventory({
    name: data["name"],
    permissions: [
      {
        userId: data["userId"],
      },
    ],
    description: data["description"],
  });
  await inventory.save();
  return inventory;
}

async function deleteInventory(id) {
  await Inventory.deleteOne({ _id: id });
}

/********************************
 *  Database testing functions
 ********************************/
async function addUser() {
  const exampleUser = new User({
    username: "example",
    password: "examplepassword",
  });
  await exampleUser.save();
  return exampleUser;
}

async function addInventory() {
  const exampleInventory = new Inventory({
    name: "Test Inventory",
    permissions: [
      {
        userId: "6206ca0a0b2d60932d986465",
      },
    ],
    inventoryTable: [
      {
        values: ["Test Item", 0],
      },
      {
        values: ["Test Item 2", 1],
      },
      {
        values: ["Test Item 3", 2],
      },
    ],
  });
  await exampleInventory.save();
  return exampleInventory;
}

exports.getUsers = getUsers;
exports.getInventories = getInventories;
exports.addUser = addUser;
exports.addInventory = addInventory;
exports.createInventory = createInventory;
exports.deleteInventory = deleteInventory;
