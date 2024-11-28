const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const ExtraImage = sequelize.define('ExtraImage', {
    selectPropertyType: { type: DataTypes.ENUM('villa', 'villas', 'flat-for-sale', 'commercials-spaces', 'TO-LET'), allowNull: false },
    propertyImage: { type: DataTypes.STRING },
    property360Image: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = ExtraImage;
