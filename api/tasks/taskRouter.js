const express = require("express");
const Projects = require("../../data/helpers/projectModel.js");
const Tasks = require("../../data/helpers/taskModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Tasks.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the tasks",
      });
    });
});

module.exports = router;
