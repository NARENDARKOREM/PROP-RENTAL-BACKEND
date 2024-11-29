const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Property = require("./Property");

const Enquiry = sequelize.define("Enquiry", {
    propertyTitle: {
        type: DataTypes.ENUM('Villa', 'Villas', 'Flat for Sale', 'Commercial spaces', 'TO-LET'),
        allowNull: false,
    },
    propertyImage: {
        type: DataTypes.STRING,
        allowNull: false,
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
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
    propertyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Property, key: 'id' } }
}, { timestamps: true, paranoid: true });

Enquiry.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Enquiry.belongsTo(Property, { foreignKey: "propertyId", onDelete: "CASCADE" });

module.exports = Enquiry;
