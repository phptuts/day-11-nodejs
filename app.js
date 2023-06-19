const express = require("express");
const app = express();
app.use(express.json());
let users = [];
app.get("/", (request, response) => {
  response.status(200).json(users);
});

app.post("/", (request, response) => {
  console.log(request.body, "user");
  users.push(request.body);
  response.status(201).json(request.body);
});

app.put("/:id", (request, response) => {
  console.log(request.params.id, "id");
  response.send(request.body);
});

app.delete("/:blue", (request, response) => {
  console.log(request.body, "body");
  console.log(request.params.blue, "id");
  response.status(204).send("");
});

app.listen(3000, () => {
  console.log("working");
});
