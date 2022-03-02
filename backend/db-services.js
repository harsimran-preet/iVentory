const database = require("./db-config");
const User = require("./models/user");
const Inventory = require("./models/inventory");
const mongoose = require("mongoose");

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
    name: data["name"],
  });
  let result;
  try {
    result = await user.save();
  } catch (error) {
    throw error;
  }
  return result;
}

async function authenticate(data) {
  const username = data["username"];
  const password = data["password"];
  let user = await User.findOne({
    username: username,
    password: password,
  });
  if (user == null) throw new Error("User not found");
  return user;
}

/********************************
 *  Inventory functions
 ********************************/
async function getInventories() {
  return await Inventory.find();
}

async function getInventory(id) {
  let inventoryId = database.ObjectId(id);
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

  await User.findByIdAndUpdate(data["userId"], {
    $push: {
      inventoryList: {
        inventoryId: inventory._id,
      },
    },
  });
  return inventory;
}

async function deleteInventory(id) {
  const inventoryId = database.ObjectId(id);
  const inventory = await Inventory.findById(inventoryId);
  if (inventory == null) throw new Error("Inventory not found");
  const users = inventory["permissions"].map(async (perm) => {
    await User.findByIdAndUpdate(perm["userId"], {
      $pull: {
        inventoryList: { inventoryId: inventoryId },
      },
    });
    return perm["userId"];
  });
  Promise.all(users);
  await Inventory.deleteOne({ _id: id });
}

async function updateItemColumn(id) {
  await Inventory.updateOne(
    { _id: id },
    {
      $push: {
        "inventoryTable.$[].values": "",
      },
    }
  ).exec();
}

async function addColumn(name, id) {
  const inventory_id = mongoose.Types.ObjectId(id);
  await Inventory.findByIdAndUpdate(inventory_id, {
    $push: {
      columnNames: name,
    },
  }).exec();
  updateItemColumn(inventory_id);
}

async function delColumn(name, id) {
  const inventory_id = mongoose.Types.ObjectId(id);
  const inventory = await Inventory.findById(inventory_id)
    .select("columnNames")
    .exec();
  if (inventory === null) throw new Error("Inventory not found");
  let columnIndex = inventory["columnNames"].indexOf(name);
  if (columnIndex === -1) {
    console.log("Column not found");
  } else {
    delColumnValues(columnIndex, id);
  }
  await Inventory.findByIdAndUpdate(inventory_id, {
    $pull: { columnNames: name },
  }).exec();
}

async function delColumnValues(index, id) {
  const result = await Inventory.findById(id);
  for (let i = 0; i < result["inventoryTable"].length; i++) {
    result["inventoryTable"][i]["values"].splice(index, 1);
  }
  await result.save();
}

/********************************
 *  Item functions
 ********************************/
async function addItem(data, id) {
  const inventory = await Inventory.findById(id).select("columnNames").exec();
  if (inventory === null) throw new Error("Inventory not found");
  const itemValues = inventory["columnNames"].map((element) => {
    if (element in data) return data[element];
    return "";
  });
  const itemId = mongoose.Types.ObjectId();
  const item = {
    _id: itemId,
    values: itemValues,
  };
  let updated = await Inventory.findByIdAndUpdate(id, {
    $push: { inventoryTable: item },
  }).exec();
  if (updated === null) throw new Error("Inventory not found");
  return item;
}

async function deleteItem(invId, itemId) {
  if (!invId || !itemId) throw Error("Id is undefined");
  const updated = await Inventory.findByIdAndUpdate(invId, {
    $pull: { inventoryTable: { _id: itemId } },
  }).exec();
  if (updated === null) {
    throw new Error("Inventory or Item not found");
  }
}

/********************************
 *  Database testing functions
 ********************************/
async function testAddColumn() {
  const inventory_id = "6206db25720f7dbdbc0b0e0f";
  Inventory.findByIdAndUpdate(inventory_id, {
    $push: {
      columnNames: "new column",
    },
  }).exec();
  updateItemColumn(inventory_id, "a");
}

async function testDeleteColumn() {
  console.log("deleteColumn");
  const inventory_id = "6206db25720f7dbdbc0b0e0f";
  Inventory.findByIdAndUpdate(inventory_id, {
    $pull: {
      columnNames: "showcase adding column",
    },
  }).exec();
}

exports.getUsers = getUsers;
exports.register = register;
exports.authenticate = authenticate;

exports.getInventories = getInventories;
exports.createInventory = createInventory;
exports.deleteInventory = deleteInventory;
exports.getInventory = getInventory;

exports.testAddColumn = testAddColumn;
exports.testDeleteColumn = testDeleteColumn;
exports.addColumn = addColumn;
exports.delColumn = delColumn;

exports.addItem = addItem;
exports.deleteItem = deleteItem;

exports.database = database;
