const dotenv = require("dotenv");
dotenv.config();
const { sequelize, UserModel } = require("./database/db");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user.route");
const loginRoute = require("./routes/login.route");
const authentication = require("./middlewares/authentication.middleware");
const app = express();
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 5129 });

wss.on("connection", function connection(client) {
  client.on("error", console.error);

  client.on("message", function message(data) {
    console.log("received: %s", data);
  });

  client.send("send message");
});

app.use(express.json());
app.use(authentication);

app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/public", express.static("public"));

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("working");
  } catch (e) {
    console.log("error", e);
  }
});
