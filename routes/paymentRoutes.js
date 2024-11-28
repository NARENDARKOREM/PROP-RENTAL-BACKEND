const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/payment', authMiddleware.isAuthenticated, paymentController.addPayment);
router.get('/payments', authMiddleware.isAuthenticated, paymentController.getAllPayments);
router.get('/payment/:id', authMiddleware.isAuthenticated, paymentController.getPaymentById);
router.put('/payment/:id', authMiddleware.isAuthenticated, paymentController.updatePayment);
router.delete('/payment/:id', authMiddleware.isAuthenticated, paymentController.deletePayment);

module.exports = router;
