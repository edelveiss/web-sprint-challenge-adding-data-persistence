exports.seed = function (knex) {
  return knex("projects").insert([
    {
      project_name: "A Waste-Less Journey",
      description:
        "This site is an example of an interactive parallax scrolling project. ",
      completed: false,
    },
    {
      project_name: "Paleo Game",
      description:
        "I look up to many Instructional Designers in the industry and Kristin Anthony is definitely one of them. ",
      completed: true,
    },
    {
      project_name: "Earthquake Preparedness Video",
      description:
        "I originally saw this video come up on my Twitter feed. I dig Killer Infographics' visual designs and always check out their new work.  ",
      completed: false,
    },
    {
      project_name: "Dogfish Head Beer Making Process",
      description:
        "The Dogfish Head cinemagraphs made me think about how cinemagraphs could be using in learning to tell a story or to show a process. ",
      completed: false,
    },
  ]);
};
