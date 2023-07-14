const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const bcyrpt = require("bcrypt");

const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    response.status(401).send("");
    return;
  }

  const isPasswordValid = await bcyrpt.compare(password, user.password);

  if (!isPasswordValid) {
    response.status(401).send("");
    return;
  }

  const payload = { userId: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  response.send({ token });
};

module.exports = { login };
