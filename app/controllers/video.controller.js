const db = require("../models");
const Comment = db.comment;
const Image = db.image;
const Video = db.video;
const Tags = db.tags;

exports.create = async (req, res, next) => {
  try {
    let response = await Video.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {}
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await Video.findAll({
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
    let response = await Video.findByPk(req.params.id, {
      include: { model: Comment },
    });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.findVideoWithTag = async (req, res, next) => {
  try {
    let response = await Video.findAll({ include: Tags });
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    await Video.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: 1, message: "Video Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.restoreVideo = async (req, res, next) => {
  try {
    await Video.restore({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: 1, message: "Video Restored Successfully" });
  } catch (err) {
    next(err);
  }
};
