require("dotenv").config();

const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});