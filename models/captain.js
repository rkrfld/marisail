'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Captain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Captain.hasOne(models.Boat)
    }
  };
  Captain.init({
    name: DataTypes.STRING,
    class: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Captain',
  });
  return Captain;
};