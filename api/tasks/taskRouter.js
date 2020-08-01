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

router.get("/:id", validateTaskId, (req, res) => {
  res.status(200).json(req.task);
});
router.get("/:id/project", validateTaskId, (req, res) => {
  const { id } = req.params;
  Tasks.findProject(id)
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

router.put("/:id", validateTaskId, validateTask, (req, res) => {
  const { id } = req.params;
  Tasks.update(req.task.id, req.body)
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        req
          .status(500)
          .json({ message: "An error occured during getting task" });
      }
    })

    .catch((error) => {
      res.statusMessage = "Error updating the task";
      console.log(error);
      res.status(500).json({
        message: "Error updating the task",
      });
    });
});
router.delete("/:id", validateTaskId, (req, res) => {
  Tasks.remove(req.task.id)
    .then((task) => {
      res.status(200).json(task);
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the task",
      });
    });
});

//custom middleware
function validateTaskId(req, res, next) {
  const { id } = req.params;
  Tasks.findById(id)
    .then((task) => {
      if (task) {
        req.task = task;
        next();
      } else {
        res.status(400).json({ message: "invalid task id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validateTask(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.description) {
      res.statusMessage = "missing required description field";
      res.status(400).json({ message: "missing required description field" });
    } else {
      //   req.task = {
      //     ...req.body,
      //     project_id: req.project_id,
      //   };
      next();
    }
  } else {
    res.statusMessage = "missing task data";
    res.status(400).json({ message: "missing task data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
