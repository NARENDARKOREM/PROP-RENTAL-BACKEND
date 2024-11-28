const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const FAQ = sequelize.define('FAQ', {
    question: { type: DataTypes.STRING, allowNull: false },
    answer: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = FAQ;
