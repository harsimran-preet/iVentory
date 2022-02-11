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
  values: [mongoose.Schema.Types.Mixed],
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

PermissionSchema.path("userId").validate(async (value) => {
  return await User.findById(value);
}, "User does not exist");

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
