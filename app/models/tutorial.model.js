module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define(
    "tutorial",
    {
      title: {
        type: Sequelize.STRING,
        // set(value) {
        //     this.setDataValue('title', value + 'Data')
        // },
        // get() {
        //   return this.getDataValue("title") + "title" + this.status;
        // },
        allowNull: false,
        unique: true,
        // validate: {
        //   equals: "hi",
        // },
      },
      description: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.BOOLEAN,
        validate: {
          //   equals: {
          //     args: true,
          //     msg: "published must be true",
          //   },
          isIn: {
            args: [[true, false]],
            msg: "published must be boolean",
          },
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      /* for removing createdAt or updatedAt */
      //   timestamps: false
      // updatedAt: false,
      // createdAt: false,
      /* for name change */
      createdAt: "created_at",
      updatedAt: "update_at",
      /* for change table name */
      //   tableName: 'userData'
    }
  );
  return Tutorial;
};
