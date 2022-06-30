const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./Db/db");
db();
dotenv.config();

const app = express();
app.use(cors())

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/get", (req, res) => {
  res.send("Hello");
});

app.use("/api", require("./routes/routes"));

app.listen(PORT, () => {
  console.log("Backend is running on the ", "~green;", PORT);
});
