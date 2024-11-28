const Enquiry = require('../models/Enquiry');

// Add Enquiry
const addEnquiry = async (req, res) => {
    const { propertyTitle, propertyImage, enquiryUsername, enquiryMobile, propertyId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const enquiry = await Enquiry.create({ propertyTitle, propertyImage, enquiryUsername, enquiryMobile, userId: req.user.id, propertyId });
        res.status(201).json({ message: 'Enquiry added successfully', enquiry });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Enquiries
const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.findAll();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Enquiry by ID
const getEnquiryById = async (req, res) => {
    const { id } = req.params;

    try {
        const enquiry = await Enquiry.findByPk(id);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Enquiry
const updateEnquiry = async (req, res) => {
    const { id } = req.params;
    const { propertyTitle, propertyImage, enquiryUsername, enquiryMobile, propertyId } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const enquiry = await Enquiry.findByPk(id);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }

        enquiry.propertyTitle = propertyTitle;
        enquiry.propertyImage = propertyImage;
        enquiry.enquiryUsername = enquiryUsername;
        enquiry.enquiryMobile = enquiryMobile;
        enquiry.propertyId = propertyId;
        enquiry.userId = req.user.id; // Update userId
        await enquiry.save();

        res.status(200).json({ message: 'Enquiry updated successfully', enquiry });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Enquiry
const deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const enquiry = await Enquiry.findOne({ where: { id }, paranoid: false });
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }

        if (enquiry.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Enquiry is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await enquiry.destroy({ force: true });
            res.status(200).json({ message: 'Enquiry permanently deleted successfully' });
        } else {
            await enquiry.destroy();
            res.status(200).json({ message: 'Enquiry soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry };
