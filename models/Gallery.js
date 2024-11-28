const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Property = require('./Property');
const GalleryCategory = require('./GalleryCategory');

const Gallery = sequelize.define('Gallery', {
    selectPropertyType: { type: DataTypes.ENUM('villa', 'villas', 'flat-for-sale', 'commercials-spaces', 'TO-LET'), allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

Gallery.belongsTo(Property, { as: 'property', foreignKey: 'propertyId' });
Gallery.belongsTo(GalleryCategory, { as: 'category', foreignKey: 'galleryCategoryId' });

module.exports = Gallery;
