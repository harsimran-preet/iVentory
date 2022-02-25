const backend = require("./backend");
const supertest = require("supertest");
const request = supertest(backend.app);
const spy = require("./spy-console");

describe("Running unittests", () => {
  beforeAll((done) => {
    spy
      .hideError()
      .then()
      .catch((err) => done(err));
    spy
      .hideLog()
      .then()
      .catch((err) => done(err));
    spy
      .hideDebug()
      .then()
      .catch((err) => done(err));
    backend.database
      .connectDb()
      .then()
      .catch((err) => done(err));
    done();
  });

  describe("POST /user tests", () => {
    const userData = new Map();
    userData.set("username", "username");
    userData.set("password", "password");
    userData.set("email", "email");
    userData.set("name", "name");
    userDataKeys = ["username", "password", "email", "name"];

    const testMissing = (val) =>
      it("should throw Validation Error when given no " + val, (done) => {
        spy.errorClear();
        userData.delete(val);
        request
          .post("/user")
          .send(Object.fromEntries(userData))
          .then((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body["error"]).toBeDefined();
            expect(spy.error).toHaveBeenCalled();
            expect(spy.error.mock.calls[0][0].name).toBe("ValidationError");
            expect(spy.error.mock.calls[0][0].message).toBe(
              `User validation failed: ${val}: Path \`${val}\` is required.`
            );
            userData.set(val, val);
            done();
          })
          .catch((err) => {
            userData.set(val, val);
            done(err);
          });
      });
    for (val of userDataKeys) {
      testMissing(val);
    }
  });

  afterAll(async () => {
    await backend.database.closeDbConnection();
    await spy.restore();
  });
});
