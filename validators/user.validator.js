const yup = require('yup');
const { UserModel } = require('../database/db');
require('yup-password')(yup);// extend yup

const createUserSchema =  yup.object({
    email: yup.string().email().required().test('unique-email', async (email) => {
        const user = await UserModel.findOne({ where: { email } });

        return user !== undefined && user !== null;
    }),
    password: yup.string().required().min(8).max(30).minLowercase(1).minUppercase(1).minSymbols(1)
});

const loginValidation = yup.object({
    email: yup.string(),
    password: yup.string()
})




module.exports = {
    createUserSchema,
    loginValidation
};