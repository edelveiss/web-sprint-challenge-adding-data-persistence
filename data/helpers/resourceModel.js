const db = require("../db-config.js");
module.exports = {
  find,
  findById,
  findProjects,
  addToProject,
  add,
  update,
};

function find() {
  return db("resources");
}

function findById(id) {
  return db("resources").where({ id }).first();
}
function findProjects(id) {
  return db("projects as p")
    .join("project_resources as pr", "pr.project_id", "p.id")
    .join("resources as r", "r.id", "pr.resource_id")
    .select("r.id as resource_id", "p.project_name as project_name")
    .where("pr.resource_id", id);
}

function add(resource) {
  return db("resources")
    .insert(resource)
    .then((ids) => {
      return findById(ids[0]);
    });
}
function addToProject(project_id, resource_id) {
  return db("project_resources").insert({ project_id, resource_id });
}

function update(id, changes) {
  return db("resources")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}

// function remove(id) {
//   return db("resources")
//     .where("id", id)
//     .del()
//     .then((delRow) => (delRow > 0 ? id : null));
// }
