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
router.post("/", validateProject, (req, res) => {
  Projects.add(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the project",
      });
    });
});
router.post("/:id/tasks", validateProjectId, validateTask, (req, res) => {
  Tasks.add(req.task)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the task",
      });
    });
});
//----------------------------------------------
router.post("/:id/resources", validateProjectResource, (req, res) => {
  const user_id = req.params.id;
  //const resource_id = req.body.resource_id;
  const resource_id = req.project_resource.resource_id;
  Resources.addToProject(user_id, resource_id)
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

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/tasks", validateProjectId, (req, res) => {
  Projects.findTasks(req.project.id)
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
router.get("/:id/resources", validateProjectId, (req, res) => {
  Projects.findResources(req.project.id)
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the resources",
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.project.id)
    .then((project) => {
      res.status(200).json(project);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the project",
      });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Projects.update(req.project.id, req.body)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        req
          .status(500)
          .json({ message: "An error occured during getting project" });
      }
    })

    .catch((error) => {
      res.statusMessage = "Error updating the project";
      console.log(error);
      res.status(500).json({
        message: "Error updating the project",
      });
    });
});

//custom middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.findById(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateProject(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.project_name) {
      res.statusMessage = "missing required project name  field";
      res.status(400).json({ message: "missing required project name field" });
      //res.status(400).end();
    } else {
      next();
    }
  } else {
    res.statusMessage = "missing project data";
    res.status(400).json({ message: "missing project data" });
  }
}

function validateTask(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.description) {
      res.statusMessage = "missing required description field";
      res.status(400).json({ message: "missing required description field" });
    } else {
      req.task = {
        ...req.body,
        project_id: req.project.id,
      };
      next();
    }
  } else {
    res.statusMessage = "missing task data";
    res.status(400).json({ message: "missing task data" });
  }
}
function validateProjectResource(req, res, next) {
  if (!isEmpty(req.body)) {
    req.project_resource = {
      ...req.body,
      resource_id: req.body.resource_id,
    };
    next();
  } else {
    res.statusMessage = "missing resource data";
    res.status(400).json({ message: "missing resource data" });
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
