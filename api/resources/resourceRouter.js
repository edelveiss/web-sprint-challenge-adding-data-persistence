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
router.get("/:id", validateResourceId, (req, res) => {
  res.status(200).json(req.resource);
});
//router.get("/:id/projects", validateResourceId, (req, res) => {
router.get("/:id/projects", (req, res) => {
  const { id } = req.params;
  Resources.findProjects(id)
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
router.post("/", validateResource, (req, res) => {
  Resources.add(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the resource",
      });
    });
});

router.put("/:id", validateResourceId, validateResource, (req, res) => {
  const { id } = req.params;
  Resources.update(req.resource.id, req.body)
    .then((resource) => {
      if (resource) {
        res.status(200).json(resource);
      } else {
        req
          .status(500)
          .json({ message: "An error occured during getting resource" });
      }
    })

    .catch((error) => {
      res.statusMessage = "Error updating the resource";
      console.log(error);
      res.status(500).json({
        message: "Error updating the resource",
      });
    });
});

//custom middleware
function validateResourceId(req, res, next) {
  const { id } = req.params;
  Resources.findById(id)
    .then((resource) => {
      if (resource) {
        req.resource = resource;
        next();
      } else {
        res.status(400).json({ message: "invalid resource id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateResource(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.resource_name) {
      res.statusMessage = "missing required resource_name field";
      res.status(400).json({ message: "missing required resource_name field" });
    } else {
      next();
    }
  } else {
    res.statusMessage = "missing resource data";
    res.status(400).json({ message: "missing resource data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
