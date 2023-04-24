'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exam_conducted_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exam_id: {
        type: Sequelize.STRING
      },
      question_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      total_questions: {
        type: Sequelize.STRING
      },
      total_attended_questions: {
        type: Sequelize.STRING
      },
      right_answer: {
        type: Sequelize.STRING
      },
      wrong_answer: {
        type: Sequelize.STRING
      },
      not_answer: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.STRING
      },
      rank: {
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
    await queryInterface.dropTable('exam_conducted_users');
  }
};