const GalleryCategory = require('../models/GalleryCategory');

// Add Gallery Category
const addGalleryCategory = async (req, res) => {
    const { selectPropertyType, name, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const galleryCategory = await GalleryCategory.create({ selectPropertyType, name, status, userId: req.user.id });
        res.status(201).json({ message: 'Gallery Category added successfully', galleryCategory });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Gallery Categories
const getAllGalleryCategories = async (req, res) => {
    try {
        const galleryCategories = await GalleryCategory.findAll();
        res.status(200).json(galleryCategories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Gallery Category by ID
const getGalleryCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const galleryCategory = await GalleryCategory.findByPk(id);
        if (!galleryCategory) {
            return res.status(404).json({ error: 'Gallery Category not found' });
        }
        res.status(200).json(galleryCategory);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Gallery Category
const updateGalleryCategory = async (req, res) => {
    const { id } = req.params;
    const { selectPropertyType, name, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const galleryCategory = await GalleryCategory.findByPk(id);
        if (!galleryCategory) {
            return res.status(404).json({ error: 'Gallery Category not found' });
        }

        galleryCategory.selectPropertyType = selectPropertyType;
        galleryCategory.name = name;
        galleryCategory.status = status;
        galleryCategory.userId = req.user.id; // Update userId
        await galleryCategory.save();

        res.status(200).json({ message: 'Gallery Category updated successfully', galleryCategory });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Gallery Category
const deleteGalleryCategory = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const galleryCategory = await GalleryCategory.findOne({ where: { id }, paranoid: false });
        if (!galleryCategory) {
            return res.status(404).json({ error: 'Gallery Category not found' });
        }

        if (galleryCategory.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Gallery Category is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await galleryCategory.destroy({ force: true });
            res.status(200).json({ message: 'Gallery Category permanently deleted successfully' });
        } else {
            await galleryCategory.destroy();
            res.status(200).json({ message: 'Gallery Category soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addGalleryCategory, getAllGalleryCategories, getGalleryCategoryById, updateGalleryCategory, deleteGalleryCategory };
