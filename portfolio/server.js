// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/authRoute"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
