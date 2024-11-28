const express = require('express');
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/gallery', authMiddleware.isAuthenticated, galleryController.addGallery);
router.get('/galleries', authMiddleware.isAuthenticated, galleryController.getAllGalleries);
router.get('/gallery/:id', authMiddleware.isAuthenticated, galleryController.getGalleryById);
router.put('/gallery/:id', authMiddleware.isAuthenticated, galleryController.updateGallery);
router.delete('/gallery/:id', authMiddleware.isAuthenticated, galleryController.deleteGallery);

module.exports = router;
