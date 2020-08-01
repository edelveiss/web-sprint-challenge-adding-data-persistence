const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./projects/projectRouter.js");
const resourceRouter = require("./resources/resourceRouter.js");
const taskRouter = require("./tasks/taskRouter.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

server.get("/", (req, res) => {
  res.send(`
              <h2>Lambda Projects API</h>
              <p>Welcome to the Lambda Projects API</p>
            `);
});

module.exports = server;
