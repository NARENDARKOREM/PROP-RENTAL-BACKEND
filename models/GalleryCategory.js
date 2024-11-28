const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const GalleryCategory = sequelize.define('GalleryCategory', {
    selectPropertyType:{type: DataTypes.ENUM('villa', 'villas', 'flat-for-sale', 'commercials-spaces', 'TO-LET'), allowNull: false},
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
  },{timestamps:true, paranoid:true});
  

module.exports = GalleryCategory;