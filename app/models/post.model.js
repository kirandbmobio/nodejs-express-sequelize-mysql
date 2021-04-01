module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define(
    "posts",
    {
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      tutorial_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Posts;
};
