const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Page = sequelize.define('Page', {
    title: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    description: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = Page;
