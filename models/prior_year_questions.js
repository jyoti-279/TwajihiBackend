'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prior_year_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  prior_year_questions.init({
    prior_year_exam_id: DataTypes.STRING,
    question_name: DataTypes.STRING,
    question_type: DataTypes.ENUM('1', '2', '3', '4'),
    answer_one: DataTypes.STRING,
    answer_two: DataTypes.STRING,
    answer_three: DataTypes.STRING,
    answer_four: DataTypes.STRING,
    answer_one_status: DataTypes.ENUM('right', 'wrong'),
    answer_two_status: DataTypes.ENUM('right', 'wrong'),
    answer_three_status: DataTypes.ENUM('right', 'wrong'),
    answer_four_status: DataTypes.ENUM('right', 'wrong'),
    question_status: DataTypes.ENUM('0', '1'),
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'prior_year_questions',
  });
  return prior_year_questions;
};