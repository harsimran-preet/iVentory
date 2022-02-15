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

async function register(data) {
  const user = new User({
    username: data["username"],
    password: data["password"],
    email: data["email"],
    lastname: data["lastname"],
    firstname: data["firstname"],
  });
  let result;
  try {
    result = await user.save();
  } catch (error) {
    console.log(error.message);
    throw Error(error.message);
  }
  return result;
}

/********************************
 *  Inventory functions
 ********************************/
async function getInventories() {
  return await Inventory.find();
}

async function getInventory(id) {
  let inventoryId = mongoose.Types.ObjectId(id);
  const result = await Inventory.findById(inventoryId);
  return result;
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
  User.findByIdAndUpdate(data["userId"], {
    $push: {
      inventoryList: {
        inventoryId: inventory._id,
      },
    },
  }).exec(function (err, inventory) {
    throw err;
  });
  return inventory;
}

async function deleteInventory(id) {
  const inventoryId = mongoose.Types.ObjectId(id);
  const inventory = await Inventory.findById(inventoryId).exec();
  const users = inventory["permissions"].map(async (perm) => {
    await User.findByIdAndUpdate(perm["userId"], {
      $pull: {
        inventoryList: { inventoryId: inventoryId },
      },
    }).exec();
    return perm["userId"];
  });
  Promise.all(users);
  await Inventory.deleteOne({ _id: id });
}

exports.getUsers = getUsers;
exports.register = register;
exports.getInventories = getInventories;

exports.createInventory = createInventory;
exports.deleteInventory = deleteInventory;
exports.getInventory = getInventory;
