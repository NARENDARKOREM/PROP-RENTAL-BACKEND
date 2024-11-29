const ExtraImage = require('../models/ExtraImage');

// Add Extra Image
const addExtraImage = async (req, res) => {
    const { selectPropertyType, propertyImage, property360Image, status, propertyId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const extraImage = await ExtraImage.create({ selectPropertyType, propertyImage, property360Image, status, userId: req.user.id, propertyId });
        res.status(201).json({ message: 'Extra Image added successfully', extraImage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Extra Images
const getAllExtraImages = async (req, res) => {
    try {
        const extraImages = await ExtraImage.findAll();
        res.status(200).json(extraImages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Extra Image by ID
const getExtraImageById = async (req, res) => {
    const { id } = req.params;

    try {
        const extraImage = await ExtraImage.findByPk(id);
        if (!extraImage) {
            return res.status(404).json({ error: 'Extra Image not found' });
        }
        res.status(200).json(extraImage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Extra Image
const updateExtraImage = async (req, res) => {
    const { id } = req.params;
    const { selectPropertyType, propertyImage, property360Image, status, propertyId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const extraImage = await ExtraImage.findByPk(id);
        if (!extraImage) {
            return res.status(404).json({ error: 'Extra Image not found' });
        }

        extraImage.selectPropertyType = selectPropertyType;
        extraImage.propertyImage = propertyImage;
        extraImage.property360Image = property360Image;
        extraImage.status = status;
        extraImage.propertyId = propertyId; // Update propertyId
        extraImage.userId = req.user.id; // Update userId
        await extraImage.save();

        res.status(200).json({ message: 'Extra Image updated successfully', extraImage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Extra Image
const deleteExtraImage = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const extraImage = await ExtraImage.findOne({ where: { id }, paranoid: false });
        if (!extraImage) {
            return res.status(404).json({ error: 'Extra Image not found' });
        }

        if (extraImage.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Extra Image is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await extraImage.destroy({ force: true });
            res.status(200).json({ message: 'Extra Image permanently deleted successfully' });
        } else {
            await extraImage.destroy();
            res.status(200).json({ message: 'Extra Image soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addExtraImage, getAllExtraImages, getExtraImageById, updateExtraImage, deleteExtraImage };
