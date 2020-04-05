'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: DataTypes.DATE,
    notes: DataTypes.STRING,
    symbol: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Task;
};
