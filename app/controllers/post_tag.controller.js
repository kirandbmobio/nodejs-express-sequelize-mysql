const db = require("../models");
const PostTags = db.post_tags;

exports.create = async (req, res, next) => {
  try {
    let response = await PostTags.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {}
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await PostTags.findAll({});
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
exports.findById = async (req, res, next) => {
  try {
    let response = await PostTags.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
