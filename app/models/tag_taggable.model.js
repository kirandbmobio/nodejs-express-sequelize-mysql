module.exports = (sequelize, Sequelize) => {
  const TagTaggable = sequelize.define(
    "tag_taggable",
    {
      tagId: {
        type: Sequelize.INTEGER,
        unique: "tt_unique_constraint",
      },
      taggableId: {
        type: Sequelize.INTEGER,
        unique: "tt_unique_constraint",
        references: null,
      },
      taggableType: {
        type: Sequelize.STRING,
        unique: "tt_unique_constraint",
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
  return TagTaggable;
};
