const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const bcyrpt = require("bcrypt");
const { loginValidator } = require("../validators/user.validators");
const fs = require("fs");
const path = require("path");

const login = async (request, response) => {
  try {
    let data = await loginValidator.validate(request.body, {
      abortEarly: false,
    });
    const { email, password } = data;

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
    const privateKey = fs.readFileSync(
      path.join(__dirname, "..", "private.key")
    );
    const payload = { userId: user.id };
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "4h",
      algorithm: "RS256",
    });
    response.send({ token });
  } catch (e) {
    response.status(400).send("bad request");
    return;
  }
};

module.exports = { login };
