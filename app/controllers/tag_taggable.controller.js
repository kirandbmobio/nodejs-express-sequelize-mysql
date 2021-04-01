const db = require("../models");
const TagTaggable = db.taggable;

exports.create = async (req, res, next) => {
  try {
    let response = await TagTaggable.create(req.body);
    res
      .status(200)
      .json({ status: 1, message: "create successfully", data: response });
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    let response = await TagTaggable.findAll({});
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
exports.findById = async (req, res, next) => {
  try {
    let response = await TagTaggable.findByPk(req.params.id);
    res.status(200).json({ status: 1, message: "", data: response });
  } catch (err) {
    next(err);
  }
};
