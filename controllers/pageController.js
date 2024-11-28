const Page = require('../models/Page');

// Add Page
const addPage = async (req, res) => {
    const { title, status, description } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const page = await Page.create({ title, status, description, userId: req.user.id });
        res.status(201).json({ message: 'Page added successfully', page });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Pages
const getAllPages = async (req, res) => {
    try {
        const pages = await Page.findAll();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Page by ID
const getPageById = async (req, res) => {
    const { id } = req.params;

    try {
        const page = await Page.findByPk(id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Page
const updatePage = async (req, res) => {
    const { id } = req.params;
    const { title, status, description } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const page = await Page.findByPk(id);
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        page.title = title;
        page.status = status;
        page.description = description;
        page.userId = req.user.id; // Update userId
        await page.save();

        res.status(200).json({ message: 'Page updated successfully', page });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Page
const deletePage = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const page = await Page.findOne({ where: { id }, paranoid: false });
        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        if (page.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Page is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await page.destroy({ force: true });
            res.status(200).json({ message: 'Page permanently deleted successfully' });
        } else {
            await page.destroy();
            res.status(200).json({ message: 'Page soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addPage, getAllPages, getPageById, updatePage, deletePage };
