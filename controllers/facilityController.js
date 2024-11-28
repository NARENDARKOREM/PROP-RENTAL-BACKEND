const Facility = require('../models/Facility');

// Add Facility
const addFacility = async (req, res) => {
    const { name, image, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const facility = await Facility.create({ name, image, status, userId: req.user.id });
        res.status(201).json({ message: 'Facility added successfully', facility });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Facilities
const getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.findAll();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Facility by ID
const getFacilityById = async (req, res) => {
    const { id } = req.params;

    try {
        const facility = await Facility.findByPk(id);
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }
        res.status(200).json(facility);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Facility
const updateFacility = async (req, res) => {
    const { id } = req.params;
    const { name, image, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const facility = await Facility.findByPk(id);
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        facility.name = name;
        facility.image = image;
        facility.status = status;
        facility.userId = req.user.id; // Update userId
        await facility.save();

        res.status(200).json({ message: 'Facility updated successfully', facility });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Facility
const deleteFacility = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const facility = await Facility.findOne({ where: { id }, paranoid: false });
        if (!facility) {
            return res.status(404).json({ error: 'Facility not found' });
        }

        if (facility.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Facility is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await facility.destroy({ force: true });
            res.status(200).json({ message: 'Facility permanently deleted successfully' });
        } else {
            await facility.destroy();
            res.status(200).json({ message: 'Facility soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addFacility, getAllFacilities, getFacilityById, updateFacility, deleteFacility };
