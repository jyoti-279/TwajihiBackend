'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exams_sheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exam_conduted_user_id: {
        type: Sequelize.STRING
      },
      question_id: {
        type: Sequelize.STRING
      },
      chosen_answer: {
        type: Sequelize.STRING
      },
      anwer_status: {
        type: Sequelize.ENUM('right', 'wrong')
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
    await queryInterface.dropTable('exams_sheets');
  }
};