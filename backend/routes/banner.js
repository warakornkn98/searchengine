const express = require('express')
const multer = require('multer');
const path = require('path');
const banner = require('../controller/banner')

const router = express.Router();


// ตั้งค่าการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ที่ตั้งไฟล์ที่จะเก็บ
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ตั้งชื่อไฟล์ใหม่เพื่อหลีกเลี่ยงการซ้ำ
  }
});

const upload = multer({ storage: storage });


router.get('/banner', banner.getAllBanners);
router.post('/banner', upload.single('image'), banner.addBanner);
router.delete('/banner/:id', banner.deleteBanner);

module.exports = router;

