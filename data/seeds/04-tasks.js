exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      project_id: 1,
      description:
        "Use Adobe Muse and the Scroll Effects tool inside of it to create a similar project.",
      completed: false,
    },
    {
      project_id: 2,
      description:
        "In this quick game, you are a cave person who must only eat a Paleo diet. ",
      notes:
        "I could see similarly designed games being developed as a part of a curriculum.",
      completed: true,
    },
    {
      project_id: 3,
      description:
        "With After Effects, you can truly tell a story the way you need it to be told.",
      notes: "have been teaching myself After Effects over the past few weeks.",
      completed: false,
    },
    {
      project_id: 3,
      description:
        "There are many easy to use animation tools out there but to create videos ",
      notes: " First take the Essentials course",
      completed: false,
    },
    {
      project_id: 4,
      description:
        "The Dogfish Head cinemagraphs made me think about how cinemagraphs could be using in learning to tell a story or to show a process. ",
      notes:
        " It would be a cool way of chunking out steps and then using text below to explain the process in more detail.",
      completed: false,
    },
    {
      project_id: 4,
      description:
        "Flixel has both an app and software specifically made for creating cinemagraphs.",
      notes: " You can use Photoshop to create cinemagraphs",
      completed: true,
    },
  ]);
};
