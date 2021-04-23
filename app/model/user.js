'use strict';
const bcrypt = require('bcrypt');
const moment = require("moment");
module.exports = app => {
  const {
    DataTypes
  } = require('sequelize');
  const User = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    avatar: {
      type: DataTypes.STRING,
      field: 'avatar',
      default: "shutiaogege.top/xxx.png"
    },
    role_id: {
      type: DataTypes.INTEGER,
      field: 'role_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    },
    // 更新时间
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
      }
    }
  }, {

    freezeTableName: true
  });

  User.associate = function() {
    app.model.User.belongsTo(app.model.Role, {foreignKey: 'role_id'})
  }
  return User;
};