const db = require("../db-config.js");
module.exports = {
  find,
};

function find() {
  return db("projects");
}
