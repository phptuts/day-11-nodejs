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

app.listen(3000, () => {
  console.log("working");
});
