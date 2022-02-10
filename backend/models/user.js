const mongoose = require("mongoose");

const InventoryListSchema = new mongoose.Schema({
  inventoryId: {
    type: "ObjectId",
    ref: "Inventory",
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length <= 5)
          throw new Error("Password must be 5 characters.");
      },
      required: true,
    },
    inventoryList: {
      type: [InventoryListSchema],
      default: [],
    },
  },
  { collection: "user_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
