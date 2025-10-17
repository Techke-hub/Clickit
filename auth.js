const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

module.exports = async function (req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: payload.id } });
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
