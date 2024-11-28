const Package = require('../models/Package');

// Add Package
const addPackage = async (req, res) => {
    const { packageName, packageTotalDay, packageTotalPrice, packageDescription, packageImage, packageStatus } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const package = await Package.create({ packageName, packageTotalDay, packageTotalPrice, packageDescription, packageImage, packageStatus, userId: req.user.id });
        res.status(201).json({ message: 'Package added successfully', package });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get All Packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Single Package by ID
const getPackageById = async (req, res) => {
    const { id } = req.params;

    try {
        const package = await Package.findByPk(id);
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.status(200).json(package);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Package
const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { packageName, packageTotalDay, packageTotalPrice, packageDescription, packageImage, packageStatus } = req.body;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const package = await Package.findByPk(id);
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }

        package.packageName = packageName;
        package.packageTotalDay = packageTotalDay;
        package.packageTotalPrice = packageTotalPrice;
        package.packageDescription = packageDescription;
        package.packageImage = packageImage;
        package.packageStatus = packageStatus;
        package.userId = req.user.id; // Update userId
        await package.save();

        res.status(200).json({ message: 'Package updated successfully', package });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Package
const deletePackage = async (req, res) => {
    const { id } = req.params;
    const { forceDelete } = req.query;

    if (req.user.userType !== 'admin') {
        return res.status(403).json({ error: 'Permission denied' });
    }

    try {
        const package = await Package.findOne({ where: { id }, paranoid: false });
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }

        if (package.deletedAt && forceDelete !== 'true') {
            return res.status(400).json({ error: 'Package is already soft-deleted' });
        }

        if (forceDelete === 'true') {
            await package.destroy({ force: true });
            res.status(200).json({ message: 'Package permanently deleted successfully' });
        } else {
            await package.destroy();
            res.status(200).json({ message: 'Package soft-deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addPackage, getAllPackages, getPackageById, updatePackage, deletePackage };
