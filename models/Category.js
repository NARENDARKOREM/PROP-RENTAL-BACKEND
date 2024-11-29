const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('Published', 'Unpublished'), defaultValue: 'Unpublished' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = Category;
