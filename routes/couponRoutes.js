const express = require('express');
const couponController = require('../controllers/couponController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/coupon', authMiddleware.isAuthenticated, couponController.addCoupon);
router.get('/coupons', authMiddleware.isAuthenticated, couponController.getAllCoupons);
router.get('/coupon/:id', authMiddleware.isAuthenticated, couponController.getCouponById);
router.put('/coupon/:id', authMiddleware.isAuthenticated, couponController.updateCoupon);
router.delete('/coupon/:id', authMiddleware.isAuthenticated, couponController.deleteCoupon);

module.exports = router;
