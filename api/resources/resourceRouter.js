const express = require("express");
const Projects = require("../../data/helpers/projectModel.js");
const Resources = require("../../data/helpers/resourceModel.js");

const router = express.Router();
router.get("/", (req, res) => {
  Resources.find()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the resource",
      });
    });
});

module.exports = router;
