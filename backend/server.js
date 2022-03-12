const backend = require("./backend");
const express = require("express");
//import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const PORT = process.env.PORT || 5000;
const app = express(); // main thing

// app.use(notFound);
// app.use(errorHandler);

backend.database.connectDb().then(() => {
  backend.app.listen(PORT, () => {
    console.log(`iVentory API listening at http://localhost:${PORT}`);
  });
});
