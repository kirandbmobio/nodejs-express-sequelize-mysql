let models = require("../../models");
let User = models.User;
let Company = models.Company;
let WorkingDay = models.WorkingDay;

exports.create = async (req, res, next) => {
  try {
    let response = await User.create(req.body);
    res.status(200).json({
      status: 1,
      message: "User Created Successfully",
      data: response,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* find all */
/* find all companies */
exports.findAll = async (req, res, next) => {
  try {
    let response = await User.findAll({ include: "company" });
    res
      .status(200)
      .json({ status: 1, message: "All Users Data", data: response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/* find by id */
exports.findById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let response = await User.findByPk(id, { include: "company" });
    res.status(200).json({ status: 1, message: "User Data", data: response });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

/* update User */
exports.update = async (req, res, next) => {
  try {
    let id = req.params.id;
    let num = await User.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      let response = await User.findByPk(id, { include: "company" });
      return res
        .status(200)
        .json({ status: 1, message: "Updated Data", data: response });
    } else {
      res.status(200).json({ status: 1, message: "No Data Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
