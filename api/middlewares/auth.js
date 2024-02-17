const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.cookies['token']
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, 'secretkey')
    req.user = decoded
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' })
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' })
    } else {
      return res
        .status(500)
        .json({ message: 'An error occurred while verifying the token.' })
    }
  }
}

