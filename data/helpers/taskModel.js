const db = require("../db-config.js");
module.exports = {
  find,
  findById,
  //findProjects,
  add,
  update,
  remove,
};

// function find() {
//   return db("tasks");
// }
function find() {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select(
      "p.id as project_id",
      "p.project_name as project_name",
      "p.description as project_description",
      "t.description as task_description",
      "t.notes as task_notes",
      "t.completed as task_completed"
    )
    .orderBy("p.id");
  //.where(""t.project_id", id");
}

function findById(id) {
  return db("tasks").where({ id }).first();
}

function add(task) {
  return db("tasks")
    .insert(task)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db("tasks")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db("tasks")
    .where("id", id)
    .del()
    .then((delRow) => (delRow > 0 ? id : null));
}
