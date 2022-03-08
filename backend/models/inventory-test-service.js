const Inventory = require("./inventory");

const saveInventory = (inventory) => {
  //   const inventory = new Inventory({
  //     name: name,
  //     description: description,
  //   });
  return inventory.save();
};

exports.saveInventory = saveInventory;
