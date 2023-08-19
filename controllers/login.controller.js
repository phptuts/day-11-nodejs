const jwt = require("jsonwebtoken");
const { UserModel } = require("../database/db");
const bcyrpt = require("bcrypt");
const { loginValidation } = require("../validators/user.validator");
const transFormValidationErrorToFormResponse = require("../helpers/formErrors");

const login = async (request, response) => {
  let email, password;
  try {
     let data  = await loginValidation.validate(request.body, {abortEarly: false});
     email = data.email;
     password = data.password;

  } catch(e) {
    response.status(400).send(transFormValidationErrorToFormResponse(e));
    return;
  }

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
