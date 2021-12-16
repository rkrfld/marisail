'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boat.belongsTo(models.Plan)
      Boat.belongsTo(models.Captain)
    }
  };
  Boat.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    maxPassenger: DataTypes.INTEGER,
    basePrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    PlanId: {
      type: DataTypes.INTEGER,
      unique: {
        msg: `Kapal sudah ditugaskan di kapal lain`

      }
    },
    CaptainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: `Captain sudah ditugaskan di kapal lain`

      },
      validate: {
        notEmpty: {
          msg: `Captain tidak boleh kosong`
        },
        notNull: {
          msg: `Captain tidak boleh kosong`
        }}
    }
  }, {
    sequelize,
    modelName: 'Boat',
  });
  return Boat;
};