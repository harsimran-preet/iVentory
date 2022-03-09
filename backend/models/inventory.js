const mongoose = require("mongoose");
const User = require("./user");

const PermissionSchema = new mongoose.Schema({
  userId: {
    type: "ObjectId",
    ref: "User",
  },
  // ENUM for permissions
  permission: {
    type: "String",
    enum: ["ADMIN"],
    default: "ADMIN",
  },
});

const ItemSchema = new mongoose.Schema({
  values: {
    type: [mongoose.Schema.Types.Mixed],
    default: ["", ""],
  },
});

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: [PermissionSchema],
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length > 100)
          throw new Error("Description must be shorter than 100 characters");
      },
    },
    inventoryTable: [ItemSchema],
    columnNames: {
      type: [String],
      default: ["Name", "Quantity"],
    },
    lastModified: Date,
    lastModifiedBy: String,
  },
  { collection: "inventory_list" }
);

InventorySchema.pre("save", async function (next) {
  let result = await User.find({ _id: this.permissions[0].userId });
  if (result.length === 0 || !result) {
    throw new Error("Inventory validation failed: User not found");
  }
  next();
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
