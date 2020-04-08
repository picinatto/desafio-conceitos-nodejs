const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // Return an array with all the repositories
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // Unstructure the request body to get the needed info
  const { title, url, techs } = request.body;
  // Create the repository obj setting the id using uuid and likes with 0
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  // Add the new repository to the list
  repositories.push(repository);
  // Return the repository item to the sender
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
