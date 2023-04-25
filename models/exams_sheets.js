'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exams_sheets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exams_sheets.init({
    exam_conducted_id: DataTypes.INTEGER,
    question_id: DataTypes.STRING,
    chosen_answer: DataTypes.STRING,
    answer_status: DataTypes.ENUM('right', 'wrong','not-answered')
  }, {
    sequelize,
    modelName: 'exams_sheets',
  });
  return exams_sheets;
};