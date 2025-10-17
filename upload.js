const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '/tmp/uploads' });
const { uploadToS3 } = require('../utils/s3');

router.post('/media', upload.single('file'), async (req, res) => {
  // naive: upload to S3 (or MinIO in docker-compose)
  const result = await uploadToS3(req.file);
  res.json({ url: result.Location || result.Key });
});

module.exports = router;
