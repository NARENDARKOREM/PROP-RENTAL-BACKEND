const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Property = require('./Property');

const ExtraImage = sequelize.define('ExtraImage', {
    selectPropertyType: { 
        type: DataTypes.ENUM('Villa', 'Villas', 'Flat for Sale', 'Commercial spaces', 'TO-LET'), 
        allowNull: false 
    },
    propertyImage: { type: DataTypes.STRING },
    property360Image: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM('Published', 'Unpublished'), defaultValue: 'Unpublished' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    propertyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Property, key: 'id' } } // Added relation with Property
}, { timestamps: true, paranoid: true });

module.exports = ExtraImage;
