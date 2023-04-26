'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prior_year_exams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.STRING
      },
      subcategory_id: {
        type: Sequelize.STRING
      },
      exam_name: {
        type: Sequelize.STRING
      },
      exam_year: {
        type: Sequelize.STRING
      },
      total_questions: {
        type: Sequelize.STRING
      },
      total_time: {
        type: Sequelize.STRING
      },
      marks_per_question: {
        type: Sequelize.STRING
      },
      total_marks: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prior_year_exams');
  }
};