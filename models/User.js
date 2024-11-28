const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User",{
    username: { type: DataTypes.STRING, allowNull: false },
    email:{type:DataTypes.STRING, allowNull:false},
    password: { type: DataTypes.STRING, allowNull: false },
    userType: { type: DataTypes.ENUM('admin', 'staff'), allowNull: false },
},{timestamps:true, paranoid:true});

module.exports = User;