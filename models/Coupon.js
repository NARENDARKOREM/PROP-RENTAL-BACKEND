const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Coupon = sequelize.define('Coupon', {
    image: { type: DataTypes.STRING },
    expiryDate: { type: DataTypes.DATE, allowNull: false },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    subtitle: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    minOrderAmount: { type: DataTypes.DECIMAL },
    value: { type: DataTypes.DECIMAL, allowNull: false },
    description: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = Coupon;
