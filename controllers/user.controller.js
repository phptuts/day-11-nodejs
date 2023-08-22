const { UserModel } = require("../database/db");
const bcyrpt = require("bcrypt");

const getAllUser = async (request, response) => {
  const users = await UserModel.findAll();
  response.status(200).json(users);
};

const createUser = async (request, response) => {
  const userData = request.body;
  userData.password = await bcyrpt.hash(request.body.password, 12);
  const user = await UserModel.create(userData);
  const jsonData = user.toJSON();
  delete jsonData.password;
  response.status(201).json(jsonData);
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
  const id = +request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }
  user.email = request.body.email;
  user.password = request.body.password;
  user.save();

  response.send(user);
};

const deleteUser = async (request, response) => {
  const id = +request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User not found");
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
