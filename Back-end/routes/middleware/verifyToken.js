const jwt = require('jsonwebtoken');
const secretCode = process.env.SECRET_CODE;

// Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretCode, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
