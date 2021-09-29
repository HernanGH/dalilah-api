const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

const validAuthentication = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).json({ message: 'token is required' });
  } else {
    const token = bearerToken.split(' ')[1];
  
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'invalid token' });
      }
    }else {
      res.status(401).json({ message: 'token is required' });
    }
  }
};

module.exports = validAuthentication;
