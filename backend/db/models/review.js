'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
      Review.belongsTo(models.User, { foreignKey: "userId"});
      Review.belongsTo(models.Spot, { foreignKey: "spotId"})
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   isBetween(value){
      //     if( value < 1 || value > 5){
      //       throw new Error("Stars must be an integer from 1 to 5")
      //     }
      //   }
      // }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
