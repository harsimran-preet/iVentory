const dbService = require("./db-services");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { validationHandler, errorHandler, catchAsync } = require("./error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/user",
  catchAsync(async (req, res) => {
    let users = await dbService.getUsers();
    res.send({ user_list: users });
    next();
  })
);

app.get(
  "/inventory",
  catchAsync(async (req, res, next) => {
    let inventories = await dbService.getInventories();
    res.send({ inventory_list: inventories });
    next();
  })
);

app.get(
  "/inventory/:id",
  catchAsync(async (req, res, next) => {
    let inventory = await dbService.getInventory(req.params.id);
    res.send({ inventory: inventory });
    next();
  })
);

app.post(
  "/inventory",
  catchAsync(async (req, res, next) => {
    let inventory = await dbService.createInventory(req.body);
    res.status(201).send({ inventory: inventory });
    next();
  })
);

app.delete(
  "/inventory/:id",
  catchAsync(async (req, res, next) => {
    await dbService.deleteInventory(req.params.id);
    res.status(204).end();
    next();
  })
);

app.use(validationHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`iVentory API listening at http://localhost:${PORT}`);
});
