const dotenv = require("dotenv");
dotenv.config();
const { sequelize, UserModel } = require("./database/db");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user.route");
const loginRoute = require("./routes/login.route");
const app = express();
app.use(express.json());

app.use("/users", userRoute);
app.use("/login", loginRoute);

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("working");
  } catch (e) {
    console.log("error", e);
  }
});
