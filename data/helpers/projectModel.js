const db = require("../db-config.js");
module.exports = {
  find,
  findById,
  findTasks,
  findResources,
  add,
  update,
  remove,
};

function find() {
  return db("projects");
}
function findById(id) {
  return db("projects").where({ id }).first();
}

function findTasks(id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "p.project_name as project_name",
      "t.id as task_id",
      "t.description as task_description",
      "t.notes as task_notes",
      "t.completed as task_completed"
    )
    .where("t.project_id", id);
}

function findResources(id) {
  return db("resources as r")
    .join("project_resources as pr", "r.id", "pr.resource_id")
    .join("projects as p", "p.id", "pr.project_id")
    .select(
      "p.id as project_id",
      "p.project_name as project_name",
      "r.resource_name as resource_name",
      "r.description as resource_description"
    )
    .where("pr.project_id", id);
}

function add(project) {
  return db("projects")
    .insert(project)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db("projects")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
