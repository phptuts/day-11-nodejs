const dotenv = require("dotenv");
dotenv.config();
const { WebSocketServer } = require("ws");
const { sequelize, UserModel } = require("./database/db");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user.route");
const loginRoute = require("./routes/login.route");
const authentication = require("./middlewares/authentication.middleware");
const app = express();
app.use(express.json());
app.use(authentication);
const path = require("path");
const wss = new WebSocketServer({ port: 5290 });
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
app.use((request, response, next) => {
  request.wss = wss;

  next();
});
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/public", express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "index.html"));
});
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("working");
  } catch (e) {
    console.log("error", e);
  }
});
