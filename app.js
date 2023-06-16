const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hi");
});

app.post("/", (request, response) => {
  console.log(request.body, "user");
  response.send("works");
});

app.put("/:id", (request, response) => {
  console.log(request.params.id, "id");
  response.send(request.body);
});

app.delete("/:blue", (request, response) => {
  console.log(request.body, "body");
  console.log(request.params.blue, "id");
  response.send("");
});

app.listen(3000, () => {
  console.log("working");
});
