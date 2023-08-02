const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");

const auth = async (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).send("");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.userId;
    const user = await UserModel.findByPk(userId);
    if (user) {
      next();
      return;
    }
  } catch (e) {
    console.log(e);
  }

  res.status(401).send("");
};

module.exports = auth;
