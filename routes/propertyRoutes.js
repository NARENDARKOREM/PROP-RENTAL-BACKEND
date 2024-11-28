const express = require('express');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/property', authMiddleware.isAuthenticated, propertyController.addProperty);
router.get('/properties', authMiddleware.isAuthenticated, propertyController.getAllProperties);
router.get('/property/:id', authMiddleware.isAuthenticated, propertyController.getPropertyById);
router.put('/property/:id', authMiddleware.isAuthenticated, propertyController.updateProperty);
router.delete('/property/:id', authMiddleware.isAuthenticated, propertyController.deleteProperty);

module.exports = router;
