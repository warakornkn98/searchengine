const conn = require('../config/db')

exports.getBloodinfo = async (req, res) => {
    const { public_id } = req.body;
    console.log(public_id);
    try {
        const donorSql = "SELECT * FROM donor WHERE public_id = ?";
        const antigenSql = "SELECT * FROM antigens WHERE public_id = ?";
        
        conn.execute(donorSql, [public_id], (donorErr, donorResults) => {
            if (donorErr) {
                return res.status(500).json({ message: donorErr.message });
            }
            if (donorResults.length === 0) {
                return res.status(404).json({ message: "Donor not found" });
            }
            
            conn.execute(antigenSql, [public_id], (antigenErr, antigenResults) => {
                if (antigenErr) {
                    return res.status(500).json({ message: antigenErr.message });
                }
                
                // Find matching antigen for the donor
                const matchingAntigen = antigenResults.find(antigen => antigen.public_id === donorResults[0].public_id);

                // Combine donor and antigen data into a single response object
                const response = {
                    public_id: donorResults[0].public_id,
                    donor_id: donorResults[0].donor_id,
                    fname: donorResults[0].fname,
                    lname: donorResults[0].lname,
                    gr: donorResults[0].gr,
                    rh: donorResults[0].rh,
                    ...matchingAntigen // Combine antigen information
                };
                
                res.status(200).json(response);
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllBloodinfo = async (req, res) => {
    try {
        const donorSql = "SELECT * FROM donor";
        const antigenSql = "SELECT * FROM antigens";

        conn.execute(donorSql, (donorErr, donorResults) => {
            if (donorErr) {
                return res.status(500).json({ message: donorErr.message });
            }

            conn.execute(antigenSql, (antigenErr, antigenResults) => {
                if (antigenErr) {
                    return res.status(500).json({ message: antigenErr.message });
                }

                const response = donorResults.map(donor => {
                    const matchingAntigen = antigenResults.find(
                        antigen => antigen.public_id === donor.public_id
                    );

                    return {
                        public_id: donor.public_id,
                        donor_id: donor.donor_id,
                        fname: donor.fname,
                        lname: donor.lname,
                        gr: donor.gr,
                        rh: donor.rh,
                        ...matchingAntigen
                    };
                });

                res.status(200).json(response);
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


exports.addBloodInfo = (req, res) => {
    const { public_id, donor_id, fname, lname, gr, rh } = req.body;

    if (!public_id || !donor_id || !fname || !lname || !gr || !rh) {
      return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
  
    const sql = "INSERT INTO donor (public_id, donor_id, fname, lname, gr, rh) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [public_id, donor_id, fname, lname, gr, rh];
  
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
      }
      res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", data: { public_id, donor_id, fname, lname, gr, rh } });
    });
  };