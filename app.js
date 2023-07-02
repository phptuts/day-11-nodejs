const express = require("express");
const app = express();
app.use(express.json());
let users = [];
app.get("/", (request, response) => {
  response.status(200).json(users);
});

app.post("/", (request, response) => {
  let user = request.body;
  user.id = Date.now();
  users.push(user);
  response.status(201).json(user);
});

app.put("/:id", (request, response) => {
  console.log(request.params.id, "id");
  response.send(request.body);
});

app.delete("/:id", (request, response) => {
  const id = +request.params.id;
  users = users.filter((u) => u.id !== id);
  response.status(204).send("");
});

app.listen(3000, () => {
  console.log("working");
});
