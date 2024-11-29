const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Property = require('./Property');
const GalleryCategory = require('./GalleryCategory');

const Gallery = sequelize.define('Gallery', {
    selectPropertyType: { 
        type: DataTypes.ENUM('Villa', 'Villas', 'Flat for Sale', 'Commercial spaces', 'TO-LET'), 
        allowNull: false 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    status: { 
        type: DataTypes.ENUM('Published', 'Unpublished'), 
        defaultValue: 'Unpublished' 
    },
    propertyId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Property, key: 'id' } 
    },
    galleryCategoryId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: GalleryCategory, key: 'id' } 
    },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' } 
    }
}, { timestamps: true, paranoid: true });

module.exports = Gallery;
