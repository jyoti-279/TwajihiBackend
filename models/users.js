'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    otp_expire_time: DataTypes.STRING,
    status: DataTypes.ENUM('0', '1'),
    profile_image: DataTypes.STRING,
    is_active: DataTypes.ENUM('0', '1', '2'),
    decline_reason: DataTypes.STRING,
    action: DataTypes.STRING,

  },
  {
    sequelize,
    modelName: 'users',
  });
  return users;
};