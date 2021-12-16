'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan.hasOne(models.Boat)
      Plan.hasMany(models.User)
      Plan.belongsTo(models.DepartPort)
      Plan.belongsTo(models.DepartPort)
    }
  };
  Plan.init({
    departDate: DataTypes.DATE,
    arriveDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    DepartPortId: DataTypes.INTEGER,
    ArrivePortId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};