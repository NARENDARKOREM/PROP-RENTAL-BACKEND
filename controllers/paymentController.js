const Payment = require('../models/Payment');

// Add Payment
const addPayment = async (req, res) => {
    const { gatewayName, gatewaySubtitle, status, attributes, showOnWallet, showOnSubscribe } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payment = await Payment.create({ gatewayName, gatewaySubtitle, status, attributes, showOnWallet, showOnSubscribe, userId: req.user.id });
        res.status(201).json({ message: 'Payment added successfully', payment });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Payment by ID
const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Payment
const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { gatewayName, gatewaySubtitle, status, attributes, showOnWallet, showOnSubscribe } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.gatewayName = gatewayName;
        payment.gatewaySubtitle = gatewaySubtitle;
        payment.status = status;
        payment.attributes = attributes;
        payment.showOnWallet = showOnWallet;
        payment.showOnSubscribe = showOnSubscribe;
        payment.userId = req.user.id; // Update userId
        await payment.save();

        res.status(200).json({ message: 'Payment updated successfully', payment });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Payment
const deletePayment = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const payment = await Payment.findOne({ where: { id }, paranoid: false });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        if (payment.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Payment is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await payment.destroy({ force: true });
            res.status(200).json({ message: 'Payment permanently deleted successfully' });
        } else {
            await payment.destroy();
            res.status(200).json({ message: 'Payment soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addPayment, getAllPayments, getPaymentById, updatePayment, deletePayment };
