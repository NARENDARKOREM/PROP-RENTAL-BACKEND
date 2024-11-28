const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/page', authMiddleware.isAuthenticated, pageController.addPage);
router.get('/pages', authMiddleware.isAuthenticated, pageController.getAllPages);
router.get('/page/:id', authMiddleware.isAuthenticated, pageController.getPageById);
router.put('/page/:id', authMiddleware.isAuthenticated, pageController.updatePage);
router.delete('/page/:id', authMiddleware.isAuthenticated, pageController.deletePage);

module.exports = router;
