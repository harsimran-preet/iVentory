const User = require("./user");

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
});
