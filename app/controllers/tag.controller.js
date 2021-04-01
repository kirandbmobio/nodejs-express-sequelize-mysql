const db = require("../models");
const Tags = db.tags;
const Posts = db.posts;
const Video = db.video;
const Image = db.image;

exports.create = async (req, res, next) => {
  try {
    let response = await Tags.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {}
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await Tags.findAll({
      include: Posts,
    });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
exports.findById = async (req, res, next) => {
  try {
    let response = await Tags.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.tagToVideoOrImage = async (req, res, next) => {
  try {
    let response = await Tags.findAll({ include: [Video, Image] });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
