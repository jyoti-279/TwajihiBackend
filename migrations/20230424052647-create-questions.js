'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_name: {
        type: Sequelize.STRING
      },
      question_type: {
        type: Sequelize.ENUM('1', '2', '3', '4')
      },
      answer_one: {
        type: Sequelize.STRING
      },
      answer_two: {
        type: Sequelize.STRING
      },
      answer_three: {
        type: Sequelize.STRING
      },
      answer_four: {
        type: Sequelize.STRING
      },
      answer_one_status: {
        type: Sequelize.ENUM('right', 'wrong')
      },
      answer_two_status: {
        type: Sequelize.ENUM('right', 'wrong')
      },
      answer_three_status: {
        type: Sequelize.ENUM('right', 'wrong')
      },
      answer_four_status: {
        type: Sequelize.ENUM('right', 'wrong')
      },
      question_status: {
        type: Sequelize.ENUM('0', '1')
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
    await queryInterface.dropTable('questions');
  }
};