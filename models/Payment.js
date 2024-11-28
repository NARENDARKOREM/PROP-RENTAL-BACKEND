const {DataTypes} = require("sequelize");
const sequelize = require("../db");

const Payment = sequelize.define('Payment', {
    gatewayName: { type: DataTypes.STRING, allowNull: false },
    gatewaySubtitle: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('publish', 'unpublish'), defaultValue: 'unpublish' },
    attributes: { type: DataTypes.JSON },
    showOnWallet: { type: DataTypes.BOOLEAN, defaultValue: false },
    showOnSubscribe: { type: DataTypes.BOOLEAN, defaultValue: false },
  },{timestamps:true, paranoid:true});

  module.exports = Payment;