const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Package = sequelize.define('Package', {
    packageName: { type: DataTypes.STRING, allowNull: false },
    packageTotalDay: { type: DataTypes.INTEGER, allowNull: false },
    packageTotalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    packageDescription: { type: DataTypes.TEXT },
    packageImage: { type: DataTypes.STRING },
    packageStatus: { type: DataTypes.ENUM('Published', 'Unpublished'), defaultValue: 'Unpublished' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = Package;
