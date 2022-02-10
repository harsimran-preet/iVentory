const dbService = require("./db-services");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/user", async (req, res) => {
  try {
    const users = await dbService.getUsers();
    let result = { user_list: users };
    res.send(result);
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});

app.get("/inventory", async (req, res) => {
  try {
    const inventories = await dbService.getInventories();
    let result = { inventory_list: inventories };
    res.send(result);
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});

app.post("/inventory", async (req, res) => {
  let body = req.body;
  try {
    const inventory = await dbService.createInventory(body);
    let result = { inventory: inventory };
    res.status(201).send(result);
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred creating inventory");
  }
});

app.delete("/inventory/:id", async (req, res) => {
  try {
    await dbService.deleteInventory(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});

app.get("/addUser", async (req, res) => {
  try {
    let result = await dbService.addUser();
    res.status(200).send({ user: result });
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});

app.get("/addInventory", async (req, res) => {
  try {
    let result = await dbService.addInventory();
    res.status(200).send({ user: result });
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});
