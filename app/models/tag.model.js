module.exports = (sequelize, Sequelize) => {
  const Tags = sequelize.define(
    "tags",
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Tags;
};
