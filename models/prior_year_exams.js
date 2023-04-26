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
<<<<<<< HEAD
    category_id:DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    status:DataTypes.STRING,
=======
    category_id: DataTypes.STRING,
    subcategory_id: DataTypes.STRING,
>>>>>>> 84217c812e73e102c0f10c522f52bfb52bde380f
    exam_name: DataTypes.STRING,
    exam_year: DataTypes.STRING,
    total_questions: DataTypes.STRING,
    total_time: DataTypes.STRING,
<<<<<<< HEAD
    
=======
    marks_per_question: DataTypes.STRING,
    total_marks: DataTypes.STRING
>>>>>>> 84217c812e73e102c0f10c522f52bfb52bde380f
  }, {
    sequelize,
    modelName: 'prior_year_exams',
  });

  return prior_year_exams;
};