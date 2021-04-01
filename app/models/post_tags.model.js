module.exports = (sequelize, Sequelize) => {
  const Post_Tag = sequelize.define(
    "post_tag",
    {
      postId: Sequelize.INTEGER,
      tagId: Sequelize.INTEGER,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Post_Tag;
};
