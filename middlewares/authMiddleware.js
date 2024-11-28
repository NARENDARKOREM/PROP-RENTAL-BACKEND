const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Authenticated user:', req.user); // Add this line to log the user
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
