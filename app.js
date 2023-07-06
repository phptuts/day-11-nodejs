const express = require("express");
const userRoute = require("./routes/user.route");
const dotenv = require("dotenv");
dotenv.config();
const { sequelize } = require("./database/db");
const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("working");
  } catch (e) {
    console.log("error", e);
  }
});
