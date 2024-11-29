const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Payout = sequelize.define('Payout', {
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    serverProviderName: { type: DataTypes.STRING },
    transferDetails: { type: DataTypes.JSON },
    transferType: { type: DataTypes.STRING },
    vendorMobile: { type: DataTypes.STRING },
    transferPhoto: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('Pending', 'Completed', 'Failed'), defaultValue: 'Pending' },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } }
}, { timestamps: true, paranoid: true });

module.exports = Payout;
