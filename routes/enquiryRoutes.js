const express = require('express');
const enquiryController = require('../controllers/enquiryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/enquiry', authMiddleware.isAuthenticated, enquiryController.addEnquiry);
router.get('/enquiries', authMiddleware.isAuthenticated, enquiryController.getAllEnquiries);
router.get('/enquiry/:id', authMiddleware.isAuthenticated, enquiryController.getEnquiryById);
router.put('/enquiry/:id', authMiddleware.isAuthenticated, enquiryController.updateEnquiry);
router.delete('/enquiry/:id', authMiddleware.isAuthenticated, enquiryController.deleteEnquiry);

module.exports = router;
