const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Page = sequelize.define('Page', {
    title: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    description: { type: DataTypes.TEXT },
  },{timestamps:true, paranoid:true});

module.exports = Page;