const backend = require("./backend");
const PORT = process.env.PORT || 5000;

backend.database.connectDb().then(() => {
  backend.app.listen(PORT, () => {
    console.log(`iVentory API listening at http://localhost:${PORT}`);
  });
});
