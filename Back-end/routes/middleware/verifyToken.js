const jwt = require('jsonwebtoken');
const secretCode = process.env.SECRET_CODE;

// Middleware to verify and decode token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, secretCode, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; 
        next();
    });
};

module.exports = verifyToken;
