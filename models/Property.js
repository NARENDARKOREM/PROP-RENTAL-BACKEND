const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Property = sequelize.define(
  "Property",
  {
    propertyTitle: { type: DataTypes.STRING, allowNull: false },
    propertyImage: { type: DataTypes.STRING },
    propertySellerOrRent: { 
      type: DataTypes.ENUM("rent", "buy"), 
      allowNull: false 
    },
    propertyPricePerNight: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    },
    propertyCountry: {
      type: DataTypes.ENUM("India", "Australia", "South Africa", "Sri Lanka", "Nepal"),
      allowNull: false,
    },
    propertyStatus: { 
      type: DataTypes.ENUM("publish", "unpublish"), 
      allowNull: false 
    },
    propertyTotalPersonAllowed: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    fullAddress: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    selectPropertyFacility: { 
      type: DataTypes.TEXT 
    },
    propertyDescription: { 
      type: DataTypes.TEXT 
    },
    totalBeds: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    totalBathrooms: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    propertySQFT: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    propertyRating: { 
      type: DataTypes.DECIMAL(2, 1) 
    },
    selectPropertyType: {
      type: DataTypes.ENUM(
        "commercial spaces",
        "villas",
        "apartments",
        "individual houses",
        "fields"
      ),
      allowNull: false,
    },
    latitude: { 
      type: DataTypes.DECIMAL(10, 8), 
      allowNull: false 
    },
    longitude: { 
      type: DataTypes.DECIMAL(11, 8), 
      allowNull: false 
    },
    mobileNumber: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    cityAndCountry: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },      
  },
  {
    timestamps: true, 
    paranoid: true, 
  }
);

module.exports = Property;
