const jwt = require('jsonwebtoken');
const secretKey = 'MovieBox'; 

// Middleware for user authentication
function authenticateUser(req, res, next) {
  // Get the JWT token from the request headers, query params, or cookies
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    
    // If the token is valid, you can access the user data in decoded.data
    req.user = decoded.data;

    // Continue with the request
    next();
  });
}

module.exports = {authenticateUser};
