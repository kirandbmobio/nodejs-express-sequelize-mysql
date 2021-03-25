"use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersWorkingDay = sequelize.define(
    "UsersWorkingDay",
    {
      userId: DataTypes.INTEGER,
      workingDayId: DataTypes.INTEGER,
    },
    {}
  );
  UsersWorkingDay.associate = function (models) {
    UsersWorkingDay.belongsTo(models.User, { foreignKey: "userId" });
    UsersWorkingDay.belongsTo(models.WorkingDay, {
      foreignKey: "workingDayId",
    });
  };
  return UsersWorkingDay;
};
