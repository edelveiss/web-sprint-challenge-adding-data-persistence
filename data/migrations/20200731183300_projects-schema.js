//----------------------------------------------------------------------------//
// CREATE TABLES AND FOREIGN KEY RELATIONSHIPS
//----------------------------------------------------------------------------//
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments();
      tbl.string("project_name", 255).notNullable();
      tbl.text("description").defaultTo("not provided");
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("resources", (tbl) => {
      tbl.increments();
      tbl.string("resource_name", 128).notNullable().unique();
      tbl.text("description").defaultTo("not provided");
    })

    .createTable("project_resources", (tbl) => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.primary(["project_id", "resource_id"]);
    })

    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.text("description").notNullable();
      tbl.text("notes").defaultTo("not provided");
      tbl.boolean("completed").defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
