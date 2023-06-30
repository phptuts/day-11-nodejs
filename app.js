const express = require("express");
const app = express();
app.use(express.json());
let users = [];
app.get("/", (request, response) => {
  response.status(200).json(users);
});

app.post("/", (request, response) => {
  const user = request.body;
  user.id = Date.now();
  users.push(user);
  response.status(201).json(request.body);
});

app.put("/:id", (request, response) => {
  const user = request.body;
  const id = +request.params.id;
  user.id = id;
  const newUsers = users.filter((u) => u.id !== id);
  if (newUsers.length === users.length) {
    response.status(404).send({ message: "User not found" });
    return;
  }
  newUsers.push(user);
  users = newUsers;
  response.send(user);
});

app.delete("/:id", (request, response) => {
  const id = +request.params.id;
  users = users.filter((u) => u.id !== id);
  response.status(204).send("");
});

app.listen(3000, () => {
  console.log("working");
});
