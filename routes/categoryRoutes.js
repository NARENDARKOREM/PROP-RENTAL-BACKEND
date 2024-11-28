const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/category', authMiddleware.isAuthenticated, categoryController.addCategory);
router.get('/categories', authMiddleware.isAuthenticated, categoryController.getAllCategories);
router.get('/category/:id', authMiddleware.isAuthenticated, categoryController.getCategoryById);
router.put('/category/:id', authMiddleware.isAuthenticated, categoryController.updateCategory);
router.delete('/category/:id', authMiddleware.isAuthenticated, categoryController.deleteCategory);

module.exports = router;
