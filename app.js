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
    const user = await UserModel.create({
      email: "b@gmail.com",
      password: "password",
    });
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    console.log("working");
  } catch (e) {
    console.log("error", e);
  }
});
