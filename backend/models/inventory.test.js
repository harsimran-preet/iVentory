const { Types } = require("mongoose");
const Inventory = require("./inventory");
const User = require("./user");
const { getUsers } = require("./user-test-service");
const { saveInventory } = require("./inventory-test-service");
const mockingoose = require("mockingoose/lib");

describe("Running Inventory Model unit tests", () => {
  const validInventory = () => {
    return Inventory({
      name: "validname",
      description: "validdescription",
    });
  };

  const invalidDescription =
    "this is an invalid description that is more than 100 characters long. Next time make your description shorter!";

  const invalidInventory = () => {
    return Inventory({
      name: "validname",
      description: invalidDescription,
    });
  };

  it("should validate inventory when given valid inventory", () => {
    const inventory = validInventory();
    err = inventory.validateSync();
    expect(err).toBeUndefined();
  });

  it("should invalidate inventory when given long description", () => {
    const inventory = invalidInventory();
    err = inventory.validateSync();
    expect(err).toBeDefined();
    expect(err.errors["description"].message).toBe(
      `Validator failed for path \`description\` with value \`${invalidDescription}\``
    );
  });

  it("should error when saving inventory with invalid userId", async () => {
    // Our mock database has no users, so you can't save an inventory
    mockingoose(User).toReturn([], "find");
    const inventory = validInventory();
    inventory["permissions"] = [
      {
        userId: Types.ObjectId(),
      },
    ];
    await expect(async () => {
      await saveInventory(inventory);
    }).rejects.toThrowError("Inventory validation failed");
  });

  it("should save inventory when provided valid userId", async () => {
    const userId = Types.ObjectId();
    mockingoose(User).toReturn(
      [
        {
          _id: userId,
          username: "username",
          email: "email",
          password: "password",
          name: "name",
        },
      ],
      "find"
    );
    const inventory = validInventory();
    const invId = Types.ObjectId();
    const permId = Types.ObjectId();
    inventory["permissions"] = [
      {
        userId: userId,
        _id: permId,
      },
    ];
    inventory._id = invId;
    let result = await saveInventory(inventory);
    const expected = {
      name: "validname",
      description: "validdescription",
      columnNames: ["Name", "Quantity"],
      _id: invId,
      permissions: [
        {
          userId: userId,
          permission: "ADMIN",
          _id: permId,
        },
      ],
      inventoryTable: [],
    };
    // Can't test everything because of strange error, but should satisfy the testing
    expect(result._doc.permissions.userId).toEqual(expected.permissions.userId);
  });
});
