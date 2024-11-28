const Payout = require('../models/Payout');

// Add Payout
const addPayout = async (req, res) => {
    const { amount, serverProviderName, transferDetails, transferType, vendorMobile, transferPhoto, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payout = await Payout.create({ amount, serverProviderName, transferDetails, transferType, vendorMobile, transferPhoto, status, userId: req.user.id });
        res.status(201).json({ message: 'Payout added successfully', payout });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Payouts
const getAllPayouts = async (req, res) => {
    try {
        const payouts = await Payout.findAll();
        res.status(200).json(payouts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Payout by ID
const getPayoutById = async (req, res) => {
    const { id } = req.params;

    try {
        const payout = await Payout.findByPk(id);
        if (!payout) {
            return res.status(404).json({ error: 'Payout not found' });
        }
        res.status(200).json(payout);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Payout
const updatePayout = async (req, res) => {
    const { id } = req.params;
    const { amount, serverProviderName, transferDetails, transferType, vendorMobile, transferPhoto, status } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payout = await Payout.findByPk(id);
        if (!payout) {
            return res.status(404).json({ error: 'Payout not found' });
        }

        payout.amount = amount;
        payout.serverProviderName = serverProviderName;
        payout.transferDetails = transferDetails;
        payout.transferType = transferType;
        payout.vendorMobile = vendorMobile;
        payout.transferPhoto = transferPhoto;
        payout.status = status;
        payout.userId = req.user.id; // Update userId
        await payout.save();

        res.status(200).json({ message: 'Payout updated successfully', payout });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Payout
const deletePayout = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payout = await Payout.findOne({ where: { id }, paranoid: false });
        if (!payout) {
            return res.status(404).json({ error: 'Payout not found' });
        }

        if (payout.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Payout is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await payout.destroy({ force: true });
            res.status(200).json({ message: 'Payout permanently deleted successfully' });
        } else {
            await payout.destroy();
            res.status(200).json({ message: 'Payout soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addPayout, getAllPayouts, getPayoutById, updatePayout, deletePayout };
