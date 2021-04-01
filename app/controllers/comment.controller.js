const db = require("../models");
const Comment = db.comment;
const Image = db.image;
const Video = db.video;

exports.create = async (req, res, next) => {
  try {
    let response = await Comment.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {}
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await Comment.findAll({});
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
exports.findById = async (req, res, next) => {
  try {
    let response = await Comment.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.allImageComment = async (req, res, next) => {
  try {
    let response = await Comment.findAll({
      where: {
        commentTableType: "image",
      },
      include: {
        model: Image,
      },
    });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.allVideoComment = async (req, res, next) => {
  try {
    let response = await Comment.findAll({
      where: {
        commentTableType: "video",
      },
      include: {
        model: Video,
      },
    });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
