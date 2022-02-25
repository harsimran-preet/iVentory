const express = require("express");
const app = express();
const aport = 3000;
const users = require("./data/notes");
const userRoutes = require('./routes/userRoutes');
const dotenv = require("dotenv"); //place to store private stuff
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("API is running..");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((n) => n.id === req.params.id);
  res.send(user);
});

app.get("/item/:inventoryid/:itemid", (req, res) => {
  const user = users.find((n) => n.id === req.params.id);
  res.send(user);
}); 
