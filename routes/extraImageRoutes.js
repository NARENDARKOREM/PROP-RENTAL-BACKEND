const express = require('express');
const extraImageController = require('../controllers/extraImageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/extraImage', authMiddleware.isAuthenticated, extraImageController.addExtraImage);
router.get('/extraImages', authMiddleware.isAuthenticated, extraImageController.getAllExtraImages);
router.get('/extraImage/:id', authMiddleware.isAuthenticated, extraImageController.getExtraImageById);
router.put('/extraImage/:id', authMiddleware.isAuthenticated, extraImageController.updateExtraImage);
router.delete('/extraImage/:id', authMiddleware.isAuthenticated, extraImageController.deleteExtraImage);

module.exports = router;
