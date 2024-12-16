const conn = require('../config/db');

// ดึงข้อมูล Banner ทั้งหมด
exports.getAllBanners = (req, res) => {
  const sql = 'SELECT * FROM banners';
  conn.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch banners' });
    }
    res.json(results);
  });
};

// เพิ่ม Banner
exports.addBanner = (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { title } = req.body;

  if (!req.file) {
    console.log('File not provided in request.');
    return res.status(400).json({ error: 'File is required' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  const sql = 'INSERT INTO banners (title, image_url) VALUES (?, ?)';
  conn.query(sql, [title, imageUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add banner' });
    }
    res.json({ success: true, id: result.insertId });
  });
};

// ลบ Banner
exports.deleteBanner = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM banners WHERE id = ?';
  conn.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete banner' });
    }
    res.json({ success: true });
  });
};
