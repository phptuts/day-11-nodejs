const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const fs = require("fs");
const path = require("path");

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  if (!token) {
    next();
    return;
  }

  try {
    var privateKey = fs.readFileSync(path.join(__dirname, "..", "private.key"));
    const payload = jwt.verify(token, privateKey, { algorithms: "RS256" });
    const userId = payload.userId;
    const user = await UserModel.findByPk(userId);
    req.user = user;
  } catch (e) {
    console.log(e);
  }

  next();
};

module.exports = authentication;
