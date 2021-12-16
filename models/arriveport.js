'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArrivePort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArrivePort.hasOne(models.Plan)
    }
  };
  ArrivePort.init({
    city: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    isAntigen: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ArrivePort',
  });
  return ArrivePort;
};