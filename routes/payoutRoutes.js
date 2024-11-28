const express = require('express');
const payoutController = require('../controllers/payoutController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/payout', authMiddleware.isAuthenticated, payoutController.addPayout);
router.get('/payouts', authMiddleware.isAuthenticated, payoutController.getAllPayouts);
router.get('/payout/:id', authMiddleware.isAuthenticated, payoutController.getPayoutById);
router.put('/payout/:id', authMiddleware.isAuthenticated, payoutController.updatePayout);
router.delete('/payout/:id', authMiddleware.isAuthenticated, payoutController.deletePayout);

module.exports = router;
