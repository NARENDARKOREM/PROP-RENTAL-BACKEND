const {DataTypes}=require("sequelize");
const sequelize=require("../db");

const Payout = sequelize.define('Payout', {
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    serverProviderName: { type: DataTypes.STRING },
    transferDetails: { type: DataTypes.JSON },
    transferType: { type: DataTypes.STRING },
    vendorMobile: { type: DataTypes.STRING },
    transferPhoto: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' },
  },{timestamps:true,paranoid:true});

  module.exports = Payout;