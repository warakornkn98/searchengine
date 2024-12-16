const express = require('express')
const multer = require('multer');
const path = require('path');
const banner = require('../controller/banner')

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


router.get('/banner', banner.getAllBanners);
router.post('/banner', upload.single('image'), banner.addBanner);
router.delete('/banner/:id', banner.deleteBanner);

module.exports = router;
