const dbService = require("./db-services");
const express = require("express");
const app = express();
const cors = require("cors");

const {
  resourceHandler,
  validationHandler,
  errorHandler,
  catchAsync,
} = require("./errorhandlers");

const { requestLogger } = require("./loghandlers");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/user",
  catchAsync(async (req, res, next) => {
    let user = await dbService.authenticate(req.body);
    res.send({ user: user });
    next();
  })
);

app.post(
  "/user",
  catchAsync(async (req, res, next) => {
    let user = await dbService.register(req.body);
    res.status(201).send({ user: user });
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

app.post(
  "/column/:inventoryId",
  catchAsync(async (req, res, next) => {
    await dbService.addColumn(req.body["name"], req.params.inventoryId);
    res.status(201).end();
    next();
  })
);

app.delete(
  "/column/:inventoryId",
  catchAsync(async (req, res, next) => {
    await dbService.delColumn(req.body["name"], req.params.inventoryId);
    res.status(204).end();
    next();
  })
);

app.put(
  "/column/:inventoryId",
  catchAsync(async (req, res, next) => {
    await dbService.updateColumnName(
      req.body["old"],
      req.body["new"],
      req.params.inventoryId
    );
    res.status(204).end();
    next();
  })
);

app.post(
  "/item/:inventoryId",
  catchAsync(async (req, res, next) => {
    const item = await dbService.addItem(
      req.body["item"],
      req.params.inventoryId
    );
    res.status(201).send({ item: item });
    next();
  })
);

app.delete(
  "/item/:inventoryId",
  catchAsync(async (req, res, next) => {
    await dbService.deleteItem(req.params.inventoryId, req.body["itemId"]);
    res.status(204).end();
    next();
  })
);

app.use(resourceHandler);
app.use(validationHandler);
app.use(errorHandler);

exports.app = app;
exports.database = dbService.database;
