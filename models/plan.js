'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../router');
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
    departDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Departure date boleh kosong`
        },
        notNull: {
          msg: `Departure date tidak boleh kosong`
        }}
      },
    arriveDate: {
      type: DataTypes.DATE
      },
    duration: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    DepartPortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Departure Port tidak boleh kosong`
        },
        notNull: {
          msg: `Departure Port tidak boleh kosong`
        }}
    },
    ArrivePortId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Arrival Port tidak boleh kosong`
        },
        notNull: {
          msg: `Arrival Port tidak boleh kosong`
        }}
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.arriveDate = new Date().setDate(instance.departDate.getDate() + instance.duration)
      }
    },
    modelName: 'Plan',
  });
  return Plan;
};