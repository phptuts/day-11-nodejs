const { UserModel } = require("../database/db");

const getAllUser = async (request, response) => {
  const users = await UserModel.findAll();
  response.status(200).json(users);
};

const createUser = async (request, response) => {
  const user = await UserModel.create(request.body);
  response.status(201).json(user);
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

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
