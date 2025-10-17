const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const prisma = require('../config/db');

// feed
router.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const { caption, mediaUrl, thumbnailUrl } = req.body;
  const post = await prisma.post.create({ data: { caption, mediaUrl, thumbnailUrl, authorId: req.user.id } });
  res.json(post);
});

module.exports = router;
