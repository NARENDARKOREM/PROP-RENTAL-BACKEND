const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const FAQ = sequelize.define('FAQ', {
    question: { type: DataTypes.STRING, allowNull: false },
    answer: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
  },{timestamps:true, paranoid:true});

module.exports = FAQ;