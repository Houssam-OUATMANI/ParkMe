const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./middlewares/auth.middleware");

const { PORT, API_PATH_CHUNK_USER } = process.env;
const database = require("./utils/connection");
const userRoutes = require("./routes/user.routes");

database();
app.use(cors());
app.use(express.json());

app.use(API_PATH_CHUNK_USER, userRoutes);

app.listen(PORT, () => console.log("Running sur le port " + PORT));
