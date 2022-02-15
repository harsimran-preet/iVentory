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
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length < 5)
          throw new Error("Password must be at least 5 characters.");
      },
      required: true,
    },
    inventoryList: {
      type: [InventoryListSchema],
      default: [],
    },
    pic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { collection: "user_list" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
