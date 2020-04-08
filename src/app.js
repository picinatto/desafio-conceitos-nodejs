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
  // Unstructure the request params to get the id
  const { id } = request.params;
  // Unstructure the request body to get the updated data
  const { title, url, techs } = request.body;
  // Find the index of the targeted repo by the id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  // Check if the repo exists
  if (repositoryIndex < 0) {
    // If not, return error
    return response.status(400).json({ error:'Repository not found!' });
  }
  // Instanciate the updated repository obj
  repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes, // Get the old # of likes
  };

  // Update the value on the array by the index
  repositories[repositoryIndex] = repository;
  // Return the updated obj
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // Unstructure the request params to get the id
  const { id } = request.params;
  // Find the index of the targeted repo by the id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  // Check if the repo exists
  if (repositoryIndex < 0) {
    // If not, return error
    return response.status(400).json({ error:'Repository not found!' });
  }
  // If the repo exists, remove it from the array
  repositories.splice(repositoryIndex,1);
  // return the response 204 empty
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
