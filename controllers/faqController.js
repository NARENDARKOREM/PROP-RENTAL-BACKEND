const FAQ = require('../models/FAQ');

// Add FAQ
const addFAQ = async (req, res) => {
    const { question, answer, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const faq = await FAQ.create({ question, answer, status, userId: req.user.id });
        res.status(201).json({ message: 'FAQ added successfully', faq });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All FAQs
const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.findAll();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single FAQ by ID
const getFAQById = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await FAQ.findByPk(id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update FAQ
const updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { question, answer, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const faq = await FAQ.findByPk(id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }

        faq.question = question;
        faq.answer = answer;
        faq.status = status;
        faq.userId = req.user.id; // Update userId
        await faq.save();

        res.status(200).json({ message: 'FAQ updated successfully', faq });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete FAQ
const deleteFAQ = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const faq = await FAQ.findOne({ where: { id }, paranoid: false });
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }

        if (faq.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'FAQ is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await faq.destroy({ force: true });
            res.status(200).json({ message: 'FAQ permanently deleted successfully' });
        } else {
            await faq.destroy();
            res.status(200).json({ message: 'FAQ soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ };
