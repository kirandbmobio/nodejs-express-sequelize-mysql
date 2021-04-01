const { sequelize } = require("../../models");
const { Sequelize } = require("sequelize");

const queryInterface = sequelize.getQueryInterface();

exports.addColumn = async (req, res, next) => {
  try {
    let string = req.body.data_type.type;
    queryInterface.addColumn(req.params.table_name, req.body.fieldName, {
      type: Sequelize.DataTypes[string],
    });
    res.status(200).json({ status: 1, message: "Column Added Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.changeColumn = async (req, res, next) => {
  try {
    let string = req.body.data_type.type;
    queryInterface.changeColumn(req.params.table_name, req.body.fieldName, {
      type: Sequelize.DataTypes[string],
    });
    res.status(200).json({ status: 1, message: "Column change Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteColumn = async (req, res, next) => {
  try {
    queryInterface.removeColumn(req.params.table_name, req.body.fieldName);
    res.status(200).json({ status: 1, message: "Column Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteTable = async (req, res, next) => {
  try {
    queryInterface.dropTable(req.params.table_name);
    res.status(200).json({ status: 1, message: "Table Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
