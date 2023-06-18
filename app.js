const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send("Hi");
});

app.post("/", (request, response) => {
  console.log(request.body, "user");
  response.status(201).send("works");
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
