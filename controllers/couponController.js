const Coupon = require('../models/Coupon');

// Add Coupon
const addCoupon = async (req, res) => {
    const { image, expiryDate, code, title, subtitle, status, minOrderAmount, value, description } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const coupon = await Coupon.create({ image, expiryDate, code, title, subtitle, status, minOrderAmount, value, description, userId: req.user.id });
        res.status(201).json({ message: 'Coupon added successfully', coupon });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Coupons
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Coupon by ID
const getCouponById = async (req, res) => {
    const { id } = req.params;

    try {
        const coupon = await Coupon.findByPk(id);
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Coupon
const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { image, expiryDate, code, title, subtitle, status, minOrderAmount, value, description } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const coupon = await Coupon.findByPk(id);
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        coupon.image = image;
        coupon.expiryDate = expiryDate;
        coupon.code = code;
        coupon.title = title;
        coupon.subtitle = subtitle;
        coupon.status = status;
        coupon.minOrderAmount = minOrderAmount;
        coupon.value = value;
        coupon.description = description;
        coupon.userId = req.user.id; // Update userId
        await coupon.save();

        res.status(200).json({ message: 'Coupon updated successfully', coupon });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const coupon = await Coupon.findOne({ where: { id }, paranoid: false });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }

        if (coupon.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Coupon is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await coupon.destroy({ force: true });
            res.status(200).json({ message: 'Coupon permanently deleted successfully' });
        } else {
            await coupon.destroy();
            res.status(200).json({ message: 'Coupon soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addCoupon, getAllCoupons, getCouponById, updateCoupon, deleteCoupon };
