const express = require('express');
const extraImageController = require('../controllers/extraImageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/extraimage', authMiddleware.isAuthenticated, extraImageController.addExtraImage);
router.get('/extraimages', authMiddleware.isAuthenticated, extraImageController.getAllExtraImages);
router.get('/extraimage/:id', authMiddleware.isAuthenticated, extraImageController.getExtraImageById);
router.put('/extraimage/:id', authMiddleware.isAuthenticated, extraImageController.updateExtraImage);
router.delete('/extraimage/:id', authMiddleware.isAuthenticated, extraImageController.deleteExtraImage);

module.exports = router;
