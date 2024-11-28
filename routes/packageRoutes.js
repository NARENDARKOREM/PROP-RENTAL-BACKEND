const express = require('express');
const packageController = require('../controllers/packageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/package', authMiddleware.isAuthenticated, packageController.addPackage);
router.get('/packages', authMiddleware.isAuthenticated, packageController.getAllPackages);
router.get('/package/:id', authMiddleware.isAuthenticated, packageController.getPackageById);
router.put('/package/:id', authMiddleware.isAuthenticated, packageController.updatePackage);
router.delete('/package/:id', authMiddleware.isAuthenticated, packageController.deletePackage);

module.exports = router;
