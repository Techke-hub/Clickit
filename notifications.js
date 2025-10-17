
const express = require('express');
const router = express.Router();
const prisma = require('../config/db');
const { sendPushNotification } = require('../utils/expoPushSender');

router.post('/register', async (req, res) => {
  const { userId, pushToken } = req.body;
  await prisma.user.update({ where: { id: userId }, data: { pushToken } });
  res.json({ ok: true });
});

router.post('/send', async (req, res) => {
  const { toUserId, title, body } = req.body;
  const user = await prisma.user.findUnique({ where: { id: toUserId } });
  if (!user?.pushToken) return res.status(400).json({ error: 'User has no push token' });
  await sendPushNotification(user.pushToken, title, body);
  res.json({ ok: true });
});

module.exports = router;
