const {DataTypes} = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Property = require("./Property")

const Enquiry = sequelize.define("Enquiry",{
    propertyTitle:{
        type: DataTypes.ENUM("villa", "villas", "flat-for-sale", "commercials-spaces", "TO-LET"),
        allowNull:false,
    },
    propertyImage:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    enquiryUsername: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enquiryMobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true, 
          len: [10, 15], 
        },
    },
},{timestamps:true, paranoid: true});

Enquiry.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" }); 
Enquiry.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" }); 

module.exports = Enquiry;
