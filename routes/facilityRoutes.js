const express = require('express');
const facilityController = require('../controllers/facilityController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/facility', authMiddleware.isAuthenticated, facilityController.addFacility);
router.get('/facilities', authMiddleware.isAuthenticated, facilityController.getAllFacilities);
router.get('/facility/:id', authMiddleware.isAuthenticated, facilityController.getFacilityById);
router.put('/facility/:id', authMiddleware.isAuthenticated, facilityController.updateFacility);
router.delete('/facility/:id', authMiddleware.isAuthenticated, facilityController.deleteFacility);

module.exports = router;
