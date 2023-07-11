const { UserModel } = require("../database/db");

let users = [];

const getAllUser = (request, response) => {
  response.status(200).json(users);
};

const createUser = async (request, response) => {
  const user = await UserModel.create(request.body);
  response.status(201).json(user);
};

const getUser = (request, response) => {
  const id = +request.params.id;
  let user = users.find((u) => u.id === id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  response.json(user);
};

const updateUser = (request, response) => {
  const id = +request.params.id;
  let user = users.find((u) => u.id === id);

  if (!user) {
    response.status(404).send("User not found");
    return;
  }

  users = users.filter((u) => u.id !== id);
  user = request.body;
  user.id = id;
  users.push(user);

  response.send(user);
};

const deleteUser = (request, response) => {
  const id = +request.params.id;
  users = users.filter((u) => u.id !== id);
  response.status(204).send("");
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
