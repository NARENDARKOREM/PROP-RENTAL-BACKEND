const Category = require('../models/Category');

// Add Category
const addCategory = async (req, res) => {
    const { name, image, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const category = await Category.create({ name, image, status, userId: req.user.id });
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, image, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.name = name;
        category.image = image;
        category.status = status;
        category.userId = req.user.id; // Update userId
        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const category = await Category.findOne({ where: { id }, paranoid: false });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (category.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Category is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await category.destroy({ force: true });
            res.status(200).json({ message: 'Category permanently deleted successfully' });
        } else {
            await category.destroy();
            res.status(200).json({ message: 'Category soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
