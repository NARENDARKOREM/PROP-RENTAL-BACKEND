const Country = require('../models/Country');

// Add Country
const addCountry = async (req, res) => {
    const { name, image, status } = req.body;

    try {
        const country = await Country.create({ name, image, status });
        res.status(201).json({ message: 'Country added successfully', country });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Countries
const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Country by ID
const getCountryById = async (req, res) => {
    const { id } = req.params;

    try {
        const country = await Country.findByPk(id);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Country
const updateCountry = async (req, res) => {
    const { id } = req.params;
    const { name, image, status } = req.body;

    try {
        const country = await Country.findByPk(id);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }

        country.name = name;
        country.image = image;
        country.status = status;
        await country.save();

        res.status(200).json({ message: 'Country updated successfully', country });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Country
const deleteCountry = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    try {
        const country = await Country.findOne({ where: { id }, paranoid: false });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }

        if (country.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Country is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await country.destroy({ force: true });
            res.status(200).json({ message: 'Country permanently deleted successfully' });
        } else {
            await country.destroy();
            res.status(200).json({ message: 'Country soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addCountry, getAllCountries, getCountryById, updateCountry, deleteCountry };
