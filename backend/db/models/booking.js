'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "userId"});
      Booking.belongsTo(models.Spot, { foreignKey: "spotId"})
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        inPast(value){
          let startDate = new Date(value)
          let today = new Date()
          if(startDate < today){
            throw new Error ('startDate cannot be in the past')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isBefore(value){
          let endDate = new Date(value)
          let startDate = new Date(this.startDate)
          if(endDate <= startDate){
            throw new Error ('endDate cannot be on or before startDate')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
