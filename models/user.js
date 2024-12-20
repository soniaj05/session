const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  mobile:{
    type:DataTypes.STRING,
    allowNull:false,
  }
});

module.exports = User;
