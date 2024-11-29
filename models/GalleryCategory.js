const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const GalleryCategory = sequelize.define('GalleryCategory', {
    selectPropertyType: { 
        type: DataTypes.ENUM('Villa', 'Villas', 'Flat for Sale', 'Commercial spaces', 'TO-LET'), 
        allowNull: false 
    },    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('Published', 'Unpublished'), defaultValue: 'Unpublished' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = GalleryCategory;
