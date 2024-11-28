const express = require('express');
const countryController = require('../controllers/countryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/country', authMiddleware.isAuthenticated, countryController.addCountry);
router.get('/countries', authMiddleware.isAuthenticated, countryController.getAllCountries);
router.get('/country/:id', authMiddleware.isAuthenticated, countryController.getCountryById);
router.put('/country/:id', authMiddleware.isAuthenticated, countryController.updateCountry);
router.delete('/country/:id', authMiddleware.isAuthenticated, countryController.deleteCountry);

module.exports = router;
