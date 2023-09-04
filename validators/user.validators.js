const yup = require("yup");
const { UserModel } = require("../database/db");
require("yup-password")(yup);

const loginValidator = yup.object({
  email: yup.string().email("invalid email").required(),
  password: yup.string().required(),
});

const createUserValidator = yup.object({
  email: yup
    .string()
    .email("invalid email")
    .required()
    .test(
      "unique-email",
      "Your email is not unique",
      async (value, context) => {
        const user = await UserModel.findOne({ where: { email: value } });

        return user == undefined || user == null;
      }
    ),
  password: yup
    .string()
    .required()
    .min(8)
    .max(30)
    .minLowercase(1)
    .minUppercase(1)
    .minSymbols(1),
});

const updateUserValidator = yup.object({
  email: yup
    .string()
    .email("invalid email")
    .required()
    .test(
      "unique-email",
      "Your email is not unique",
      async (value, context) => {
        if (value === context.options.context) {
          return true;
        }
        const user = await UserModel.findOne({ where: { email: value } });

        return user == undefined || user == null;
      }
    ),
  password: yup
    .string()
    .required()
    .min(8)
    .max(30)
    .minLowercase(1)
    .minUppercase(1)
    .minSymbols(1),
});

module.exports = {
  loginValidator,
  createUserValidator,
  updateUserValidator,
};
