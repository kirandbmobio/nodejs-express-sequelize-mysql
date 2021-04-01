const db = require("../models");
const Posts = db.posts;
const Tutorials = db.tutorials;
const Tags = db.tags;
const PostTags = db.post_tags;

exports.create = async (req, res, next) => {
  try {
    let posts = req.body;
    console.log(posts);
    let response = await Posts.create(posts);
    console.log(response);
    res
      .status(200)
      .json({ status: 1, message: "created successfully", data: response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await Posts.findByPk(id);
    res
      .status(200)
      .json({ status: 1, message: "created successfully", data: response });
  } catch (err) {
    return next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await Posts.findAll({
      include: Tutorials,
    });
    res.status(200).json({ status: 1, message: "All posts", data: response });
  } catch (err) {}
};

exports.manyToMany = async (req, res, next) => {
  try {
    console.log("123");
    let response = await Posts.findAll({ include: Tags });
    res.status(200).json({ status: 1, message: "All posts", data: response });
  } catch (err) {
    next(err);
  }
};
