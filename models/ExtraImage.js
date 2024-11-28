const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const ExtraImage = sequelize.define('ExtraImage', {
    selectPropertyType:{type: DataTypes.ENUM('villa', 'villas', 'flat-for-sale', 'commercials-spaces', 'TO-LET'), allowNull: false},
    propertyImage: { type: DataTypes.STRING },
    property360Image: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
  },{timestamps:true, paranoid:true});

module.exports = ExtraImage;