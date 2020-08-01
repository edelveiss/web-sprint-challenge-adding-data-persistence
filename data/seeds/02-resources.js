exports.seed = function (knex) {
  return knex("resources").insert([
    {
      resource_name: "Float ",
      description:
        "Leading resource management solution with powerful scheduling, integrations, and mobile apps.",
    },
    {
      resource_name: "Mavenlink  ",
      description:
        "Resource management software that’s designed to integrate easily with other tools",
    },
    {
      resource_name: "Smartsheet  ",
      description:
        "well-rounded work execution platform with plenty of integrations, custom branding options, and great reporting features.",
    },
    {
      resource_name: "monday.com ",
      description:
        "Simplistic and engaging design, flexible planning, and clear communication between teams allows for easy and informed decisions around resource planning.",
    },
    {
      resource_name: "Schedule it ",
      description:
        "Resource management and scheduling software with multiple customizable views, reports, integrations, and workflow automations.",
    },
    {
      resource_name: "Forecast.app ",
      description:
        "Streamlined resource management software with forecasting, capacity planning, and plenty of pre-built integrations.",
    },
    {
      resource_name: "Resource Guru  ",
      description:
        "Reliable tool used by some of the world’s top agencies; a popular marketing resource management tool",
    },
  ]);
};
