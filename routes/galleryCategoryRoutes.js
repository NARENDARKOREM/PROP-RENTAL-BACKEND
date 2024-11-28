const express = require('express');
const galleryCategoryController = require('../controllers/galleryCategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/galleryCategory', authMiddleware.isAuthenticated, galleryCategoryController.addGalleryCategory);
router.get('/galleryCategories', authMiddleware.isAuthenticated, galleryCategoryController.getAllGalleryCategories);
router.get('/galleryCategory/:id', authMiddleware.isAuthenticated, galleryCategoryController.getGalleryCategoryById);
router.put('/galleryCategory/:id', authMiddleware.isAuthenticated, galleryCategoryController.updateGalleryCategory);
router.delete('/galleryCategory/:id', authMiddleware.isAuthenticated, galleryCategoryController.deleteGalleryCategory);

module.exports = router;
