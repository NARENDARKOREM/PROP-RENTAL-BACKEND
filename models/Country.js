const {DataTypes}=require("sequelize");
const sequelize = require("../db");

const Country = sequelize.define('Country', {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
  },{timestamps:true, paranoid:true});

  module.exports = Country;