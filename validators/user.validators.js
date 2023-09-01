const yup = require("yup");
require("yup-password")(yup);

const loginValidator = yup.object({
  email: yup.string().email("invalid email").required(),
  password: yup.string().required(),
});

module.exports = {
  loginValidator,
};
