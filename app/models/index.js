const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);
db.post_tags = require("./post_tags.model.js")(sequelize, Sequelize);

/* ==========add scope================= */
db.tutorials.addScope("checkStatus", {
  where: {
    status: 1,
  },
});

db.tutorials.addScope("includePosts", {
  include: {
    model: db.posts,
  },
});

// ================One to One====================
// db.tutorials.hasOne(db.posts, { foreignKey: "tutorial_id" });

/* ==================One to Many================== */
db.tutorials.hasMany(db.posts, {
  foreignKey: "tutorial_id",
  as: "postInfo",
});
db.posts.belongsTo(db.tutorials.scope("checkStatus"), {
  foreignKey: "tutorial_id",
});

/* ===========================Many to Many============= */
db.posts.belongsToMany(db.tags, { through: "post_tags" });
db.tags.belongsToMany(db.posts, { through: "post_tags" });

/* ========polymorphic one to many============== */
db.video = require("../models/video.model")(sequelize, Sequelize);
db.image = require("../models/image.model")(sequelize, Sequelize);
db.comment = require("../models/comment.model")(sequelize, Sequelize);

db.video.hasMany(db.comment, {
  foreignKey: "commentTableId",
  constraints: false,
  scope: {
    commentTableType: "video",
  },
});

db.image.hasMany(db.comment, {
  foreignKey: "commentTableId",
  constraints: false,
  scope: {
    commentTableType: "image",
  },
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentTableId",
  constraints: false,
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentTableId",
  constraints: false,
});

/* ==============polymorphic many to many============ */
db.taggable = require("../models/tag_taggable.model")(sequelize, Sequelize);

/* image to tag */
db.image.belongsToMany(db.tags, {
  through: {
    model: db.taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

/* tag to image */
db.tags.belongsToMany(db.image, {
  through: {
    model: db.taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});

/* video to tag */
db.video.belongsToMany(db.tags, {
  through: {
    model: db.taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

/* tag to video */
db.tags.belongsToMany(db.video, {
  through: {
    model: db.taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});

module.exports = db;
