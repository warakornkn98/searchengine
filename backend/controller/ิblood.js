const conn = require("../config/db");

const getDonorWithBloodGroup = (public_id) => {
  const sql = `
    SELECT 
      public_id, 
      donor_id, 
      fname, 
      lname, 
      gr, 
      rh,
      Lea, 
      Leb, 
      mia, 
      E, 
      D, 
      ee, 
      C, 
      cc, 
      P1, 
      I, 
      M, 
      N, 
      S, 
      ss, 
      Fya, 
      Fyb, 
      Dia, 
      Dib, 
      Jka, 
      Jkb, 
      K, 
      kk, 
      Xga
    FROM donor WHERE public_id = ?
  `;
  
  return new Promise((resolve, reject) => {
    conn.execute(sql, [public_id], (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return reject("Donor not found");
      resolve(results[0]);
    });
  });
};

const getMinorBloodGroup = (donorData) => {
  const minorBloodGroupColumns = [
    'Lea', 'Leb', 'mia', 'E', 'D', 'ee', 'C', 'cc', 'P1', 'I', 'M', 'N', 
    'S', 'ss', 'Fya', 'Fyb', 'Dia', 'Dib', 'Jka', 'Jkb', 'K', 'kk', 'Xga'
  ];

  return minorBloodGroupColumns.map(col => ({
    name: col,
    status: donorData[col] || null
  }));
};

exports.getBloodinfo = async (req, res) => {
  const { public_id } = req.body;
  console.log(public_id);

  try {
    const donorData = await getDonorWithBloodGroup(public_id);
    const minorBloodGroups = getMinorBloodGroup(donorData);

    const response = {
      public_id: donorData.public_id,
      donor_id: donorData.donor_id,
      fname: donorData.fname,
      lname: donorData.lname,
      gr: donorData.gr,
      rh: donorData.rh,
      minorBloodGroups: minorBloodGroups
    };

    res.status(200).json(response);
  } catch (err) {
    if (err === "Donor not found") {
      res.status(404).json({ message: err });
    } else {
      console.error("Error fetching donor data:", err);
      res.status(500).json({ message: "Server Error" });
      
    }
  }
};

exports.getAllBloodinfo = async (req, res) => {
  try {
    const sql = `
      SELECT 
        public_id, 
        donor_id, 
        fname, 
        lname, 
        gr, 
        rh,
        Lea, 
        Leb, 
        mia, 
        E, 
        D, 
        ee, 
        C, 
        cc, 
        P1, 
        I, 
        M, 
        N, 
        S, 
        ss, 
        Fya, 
        Fyb, 
        Dia, 
        Dib, 
        Jka, 
        Jkb, 
        K, 
        kk, 
        Xga
      FROM donor
    `;

    conn.execute(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const response = results.map((donor) => {
        const minorBloodGroups = getMinorBloodGroup(donor);
        return {
          public_id: donor.public_id,
          donor_id: donor.donor_id,
          fname: donor.fname,
          lname: donor.lname,
          gr: donor.gr,
          rh: donor.rh,
          minorBloodGroups: minorBloodGroups
        };
      });

      res.status(200).json(response);
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addBloodInfo = (req, res) => {
  const { public_id, donor_id, fname, lname, gr, rh, minorBloodGroups } = req.body;

  if (!public_id || !donor_id || !fname || !lname || !gr || !rh || !minorBloodGroups) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  const donorSql = "INSERT INTO donor (public_id, donor_id, fname, lname, gr, rh) VALUES (?, ?, ?, ?, ?, ?)";
  const donorValues = [public_id, donor_id, fname, lname, gr, rh];

  const minorBloodGroupColumns = [
    "Lea", "Leb", "mia", "E", "D", "ee", "C", "cc", "P1", "I", "M", "N", "S",
    "ss", "Fya", "Fyb", "Dia", "Dib", "Jka", "Jkb", "K", "kk", "Xga",
  ];

  const minorBloodGroupData = minorBloodGroupColumns.reduce((acc, column) => {
    const group = minorBloodGroups.find((item) => item.name === column);
    acc[column] = group ? group.status : null;
    return acc;
  }, {});

  conn.query(donorSql, donorValues, (donorErr, donorResult) => {
    if (donorErr) {
      console.error("Error inserting into donor:", donorErr);
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูลผู้บริจาค" });
    }

    res.status(201).json({
      message: "เพิ่มข้อมูลสำเร็จ",
      data: {
        public_id,
        donor_id,
        fname,
        lname,
        gr,
        rh,
        minorBloodGroups: minorBloodGroupData,
      },
    });
  });
};
