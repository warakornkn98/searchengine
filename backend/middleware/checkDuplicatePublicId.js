const conn = require("../config/db");

exports.checkDuplicatePublicId = (req, res, next) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "กรุณาใส่ค่า public_id" });
  }

  const sql = "SELECT COUNT(*) AS count FROM donor WHERE public_id = ?";
  const sqlRespond = `
    SELECT *
    FROM donor 
    WHERE public_id = ?
  `;

  conn.query(sql, [public_id], (err, results) => {
    if (err) {
      console.error("Error checking public_id duplication:", err);
      return res
        .status(500)
        .json({ error: "เกิดข้อผิดพลาดในการตรวจสอบข้อมูล" });
    }

    if (results[0].count > 0) {
      conn.query(sqlRespond, [public_id], (err, response) => {
        if (err) {
          console.error("Error fetching duplicate data:", err);
          return res
            .status(500)
            .json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
        }

        const minorBloodGroupColumns = [
          'Lea', 'Leb', 'mia', 'E', 'D', 'ee', 'C', 'cc', 'P1', 'I', 'M', 'N', 
          'S', 'ss', 'Fya', 'Fyb', 'Dia', 'Dib', 'Jka', 'Jkb', 'K', 'kk', 'Xga'
        ];

        const minorBloodGroups = minorBloodGroupColumns.map(col => {
          return {
            name: col,
            status: response[0][col] || null
          };
        });

        return res.status(409).json({
          error: "public_id นี้มีอยู่ในระบบแล้ว",
          existingData: {
            public_id: response[0].public_id,
            donor_id: response[0].donor_id,
            fname: response[0].fname,
            lname: response[0].lname,
            gr: response[0].gr,
            rh: response[0].rh,
            minorBloodGroups: minorBloodGroups
          }
        });
      });
    } else {
      next();
    }
  });
};
