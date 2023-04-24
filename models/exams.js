'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exam.init({
    category_id: DataTypes.STRING,
    subcategory_id: DataTypes.STRING,
    exam_name: DataTypes.STRING,
    exam_year: DataTypes.STRING,
    total_questions: DataTypes.STRING,
    total_time: DataTypes.STRING,
    marks_per_question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exams',
  });
  return exam;
};