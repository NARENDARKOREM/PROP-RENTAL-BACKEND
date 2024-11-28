const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Package = sequelize.define('Package', {
    packageName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    packageTotalDay: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    packageTotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    packageDescription: {
        type: DataTypes.TEXT
    },
    packageImage: {
        type: DataTypes.STRING
    },
    packageStatus: {
        type: DataTypes.ENUM('publish', 'unpublish'),
        defaultValue: 'unpublish'
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = Package;
