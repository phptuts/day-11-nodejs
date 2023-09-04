const { UserModel } = require("../database/db");
const bcyrpt = require("bcrypt");
const {
  createUserValidator,
  updateUserValidator,
} = require("../validators/user.validators");

const getAllUser = async (request, response) => {
  const users = await UserModel.findAll();
  response.status(200).json(users);
};

const createUser = async (request, response) => {
  try {
    const userData = await createUserValidator.validate(request.body, {
      abortEarly: false,
    });
    userData.password = await bcyrpt.hash(request.body.password, 12);
    const user = await UserModel.create(userData);
    const jsonData = user.toJSON();
    delete jsonData.password;
    response.status(201).json(jsonData);
  } catch (error) {
    response.status(400).send("bad request");
    return;
  }
};

const getUser = async (request, response) => {
  const id = +request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  response.json(user);
};

const updateUser = async (request, response) => {
  try {
    const id = +request.params.id;
    let user = await UserModel.findByPk(id);

    if (!user) {
      response.status(404).send("User not found");
      return;
    }
    const userData = await updateUserValidator.validate(request.body, {
      abortEarly: false,
      context: request.user.email,
    });
    user.email = userData.email;
    user.password = await bcyrpt.hash(userData.password, 12);
    await user.save();
    const jsonData = user.toJSON();
    delete jsonData.password;
    response.json(jsonData);
  } catch (error) {
    response.status(400).send("bad request");
    return;
  }
};

const deleteUser = async (request, response) => {
  const id = +request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  if (user.id === request.user.id) {
    response.status(403).send("You can not delete yourself.");
    return;
  }

  await user.destroy();

  response.status(204).send("");
};

const uploadPicture = async (request, response) => {
  if (request.hasError) {
    response.status(400).json(request.errors);
    return;
  }

  const user = request.user;
  user.picture_url = `/public/users/${request.file.filename}`;
  await user.save();
  response.send("ok");
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadPicture,
};
