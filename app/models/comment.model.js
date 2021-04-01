module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "comment",
    {
      title: {
        type: Sequelize.STRING,
      },
      commentTableId: {
        type: Sequelize.INTEGER,
      },
      commentTableType: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Comment;
};
