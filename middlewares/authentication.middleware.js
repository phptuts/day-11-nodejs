const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  if (!token) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.userId;
    const user = await UserModel.findByPk(userId);
    req.user = user;
  } catch (e) {
    console.log(e);
  }

  next();
};

module.exports = authentication;
