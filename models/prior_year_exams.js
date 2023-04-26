'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prior_year_exams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prior_year_exams.init({
    category_id:DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    status:DataTypes.STRING,
    exam_name: DataTypes.STRING,
    exam_year: DataTypes.STRING,
    total_questions: DataTypes.STRING,
    total_time: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'prior_year_exams',
  });

  return prior_year_exams;
};