const express = require('express');
const faqController = require('../controllers/faqController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/faq', authMiddleware.isAuthenticated, faqController.addFAQ);
router.get('/faqs', authMiddleware.isAuthenticated, faqController.getAllFAQs);
router.get('/faq/:id', authMiddleware.isAuthenticated, faqController.getFAQById);
router.put('/faq/:id', authMiddleware.isAuthenticated, faqController.updateFAQ);
router.delete('/faq/:id', authMiddleware.isAuthenticated, faqController.deleteFAQ);

module.exports = router;
