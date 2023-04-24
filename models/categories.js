'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_categories.init({
    category_name: DataTypes.STRING,
    category_image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'categories',
  });
  return product_categories;
};