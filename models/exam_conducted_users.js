'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam_conducted_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exam_conducted_users.init({
    exam_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_questions: DataTypes.STRING,
    total_attended_questions: DataTypes.STRING,
    right_answer: DataTypes.STRING,
    wrong_answer: DataTypes.STRING,
    not_answer: DataTypes.STRING,
    scored: DataTypes.INTEGER,
    exam_given: DataTypes.ENUM('true', 'false'),
  }, {
    sequelize,
    modelName: 'exam_conducted_users',
  });
  return exam_conducted_users;
};