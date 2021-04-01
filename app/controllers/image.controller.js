const db = require("../models");
const Comment = db.comment;
const Image = db.image;
const Video = db.video;
const Tags = db.tags;

exports.create = async (req, res, next) => {
  try {
    let response = await Image.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {}
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await Image.findAll({
      include: {
        model: Comment,
      },
    });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
exports.findById = async (req, res, next) => {
  try {
    let response = await Image.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.findImageWithTag = async (req, res, next) => {
  try {
    let response = await Image.findAll({ include: Tags });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
