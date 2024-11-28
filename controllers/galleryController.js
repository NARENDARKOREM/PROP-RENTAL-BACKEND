const Gallery = require('../models/Gallery');

// Add Gallery
const addGallery = async (req, res) => {
    const { selectPropertyType, name, status, propertyId, galleryCategoryId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const gallery = await Gallery.create({ selectPropertyType, name, status, propertyId, galleryCategoryId, userId: req.user.id });
        res.status(201).json({ message: 'Gallery added successfully', gallery });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Galleries
const getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.findAll();
        res.status(200).json(galleries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Gallery by ID
const getGalleryById = async (req, res) => {
    const { id } = req.params;

    try {
        const gallery = await Gallery.findByPk(id);
        if (!gallery) {
            return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Gallery
const updateGallery = async (req, res) => {
    const { id } = req.params;
    const { selectPropertyType, name, status, propertyId, galleryCategoryId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const gallery = await Gallery.findByPk(id);
        if (!gallery) {
            return res.status(404).json({ error: 'Gallery not found' });
        }

        gallery.selectPropertyType = selectPropertyType;
        gallery.name = name;
        gallery.status = status;
        gallery.propertyId = propertyId;
        gallery.galleryCategoryId = galleryCategoryId;
        gallery.userId = req.user.id; // Update userId
        await gallery.save();

        res.status(200).json({ message: 'Gallery updated successfully', gallery });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Gallery
const deleteGallery = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const gallery = await Gallery.findOne({ where: { id }, paranoid: false });
        if (!gallery) {
            return res.status(404).json({ error: 'Gallery not found' });
        }

        if (gallery.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Gallery is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await gallery.destroy({ force: true });
            res.status(200).json({ message: 'Gallery permanently deleted successfully' });
        } else {
            await gallery.destroy();
            res.status(200).json({ message: 'Gallery soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addGallery, getAllGalleries, getGalleryById, updateGallery, deleteGallery };
