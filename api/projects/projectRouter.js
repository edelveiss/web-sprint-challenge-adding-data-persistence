const express = require("express");
const Projects = require("../../data/helpers/projectModel.js");
const Tasks = require("../../data/helpers/taskModel.js");
const Resources = require("../../data/helpers/resourceModel.js");

const router = express.Router();
router.get("/", (req, res) => {
  Projects.find()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the projects",
      });
    });
});

module.exports = router;
