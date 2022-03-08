const mockingoose = require("mockingoose");
const User = require("./user");
const { saveUser } = require("./user-test-service");

describe("Running User Model unit tests", () => {
  const validUser = () => {
    return User({
      name: "validname",
      email: "validemail",
      password: "validpassword",
      username: "validusername",
    });
  };

  const requiredData = ["name", "email", "password", "username"];

  const invalidUser = (missingKey) => {
    let userData = {};
    for (const key of requiredData) {
      if (key != missingKey) userData[key] = "valid" + key;
    }
    return User(userData);
  };
  it("should validate user when given valid user", () => {
    const user = validUser();
    err = user.validateSync();
    expect(err).toBeUndefined();
  });
  it("should invalidate user when given invalid user", () => {
    for (const key of requiredData) {
      var user = invalidUser(key);
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err.errors[key].message).toBe(`Path \`${key}\` is required.`);
    }
  });
  it("should invalidate user when given short password", () => {
    const user = validUser();
    user["password"] = "invp";
    const err = user.validateSync();
    expect(err).toBeDefined();
    expect(err.errors["password"].message).toBe(
      "Validator failed for path `password` with value `invp`"
    );
  });
  it("should error when saving new user when username or email already exists", async () => {
    mockingoose(User).toReturn(1, "countDocuments");
    await expect(async () => {
      await saveUser("testusername", "testemail", "testpassword", "testname");
    }).rejects.toThrowError(
      new Error("User validation failed: User already registered")
    );
  });
  it("should save user when validation is passed", async () => {
    mockingoose(User).toReturn(0, "countDocuments");
    let result = await saveUser(
      "testusername1",
      "testemail1",
      "testpassword",
      "testname"
    );
    const expected = {
      _id: result._id,
      email: "testemail1",
      username: "testusername1",
      name: "testname",
      password: "testpassword",
      pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      inventoryList: [],
    };
    expect(result._doc).toStrictEqual(expected);
  });
});
