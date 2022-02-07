const userService = require('./user-services');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

app.get('/users', async (req, res) => {
  try {
    const users = await userService.getUsers();
    let result = {user_list: users};
    res.send(result);
  } catch(error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("Error occurred in the server");
  }
});
