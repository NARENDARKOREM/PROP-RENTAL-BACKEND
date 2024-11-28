const Property = require('../models/Property');

// Add Property
const addProperty = async (req, res) => {
    const { propertyTitle, propertyImage, propertySellerOrRent, propertyPricePerNight, propertyCountry, propertyStatus, propertyTotalPersonAllowed, fullAddress, selectPropertyFacility, propertyDescription, totalBeds, totalBathrooms, propertySQFT, propertyRating, selectPropertyType, latitude, longitude, mobileNumber, cityAndCountry } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const property = await Property.create({
            propertyTitle,
            propertyImage,
            propertySellerOrRent,
            propertyPricePerNight,
            propertyCountry,
            propertyStatus,
            propertyTotalPersonAllowed,
            fullAddress,
            selectPropertyFacility,
            propertyDescription,
            totalBeds,
            totalBathrooms,
            propertySQFT,
            propertyRating,
            selectPropertyType,
            latitude,
            longitude,
            mobileNumber,
            cityAndCountry,
            userId: req.user.id
        });
        res.status(201).json({ message: 'Property added successfully', property });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Property by ID
const getPropertyById = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Property
const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { propertyTitle, propertyImage, propertySellerOrRent, propertyPricePerNight, propertyCountry, propertyStatus, propertyTotalPersonAllowed, fullAddress, selectPropertyFacility, propertyDescription, totalBeds, totalBathrooms, propertySQFT, propertyRating, selectPropertyType, latitude, longitude, mobileNumber, cityAndCountry } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const property = await Property.findByPk(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        property.propertyTitle = propertyTitle;
        property.propertyImage = propertyImage;
        property.propertySellerOrRent = propertySellerOrRent;
        property.propertyPricePerNight = propertyPricePerNight;
        property.propertyCountry = propertyCountry;
        property.propertyStatus = propertyStatus;
        property.propertyTotalPersonAllowed = propertyTotalPersonAllowed;
        property.fullAddress = fullAddress;
        property.selectPropertyFacility = selectPropertyFacility;
        property.propertyDescription = propertyDescription;
        property.totalBeds = totalBeds;
        property.totalBathrooms = totalBathrooms;
        property.propertySQFT = propertySQFT;
        property.propertyRating = propertyRating;
        property.selectPropertyType = selectPropertyType;
        property.latitude = latitude;
        property.longitude = longitude;
        property.mobileNumber = mobileNumber;
        property.cityAndCountry = cityAndCountry;
        property.userId = req.user.id; // Update userId
        await property.save();

        res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Property
const deleteProperty = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const property = await Property.findOne({ where: { id }, paranoid: false });
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        if (property.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Property is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await property.destroy({ force: true });
            res.status(200).json({ message: 'Property permanently deleted successfully' });
        } else {
            await property.destroy();
            res.status(200).json({ message: 'Property soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty };
