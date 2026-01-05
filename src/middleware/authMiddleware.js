import jwt from 'jsonwebtoken';
import Member from '../models/memberModel.js';

export const protect = async (req, res, next) => {
  let token;

  // Check headers for "Authorization: Bearer <token>"
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user info to the request (so we know WHO made the request)
      req.user = await Member.findById(decoded.id).select('-password');

      next(); // Success! Go to the controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};