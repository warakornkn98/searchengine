const conn = require('../config/db')

exports.getBloodinfo = async (req, res) => {
    const { public_id, fname, lname } = req.body;
    console.log(public_id, fname, lname);
    try {
        const donorSql = "SELECT * FROM donor WHERE public_id = ? AND fname = ? AND lname = ?";
        const antigenSql = "SELECT * FROM antigens WHERE public_id = ?";
        
        conn.execute(donorSql, [public_id, fname, lname], (donorErr, donorResults) => {
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
                
                // รวมข้อมูลจากทั้งสองตาราง
                const response = {
                    donor: donorResults[0],
                    antigens: antigenResults[0]
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
        // SQL สำหรับดึงข้อมูลทั้งหมด
        const donorSql = "SELECT * FROM donor";
        const antigenSql = "SELECT * FROM antigens";

        // ดึงข้อมูล donor
        conn.execute(donorSql, (donorErr, donorResults) => {
            if (donorErr) {
                return res.status(500).json({ message: donorErr.message });
            }

            // ดึงข้อมูล antigens
            conn.execute(antigenSql, (antigenErr, antigenResults) => {
                if (antigenErr) {
                    return res.status(500).json({ message: antigenErr.message });
                }

                // รวมข้อมูล donor และ antigens
                const response = donorResults.map(donor => {
                    // ค้นหา antigen ที่ตรงกับ donor.public_id
                    const matchingAntigen = antigenResults.find(
                        antigen => antigen.public_id === donor.public_id
                    );

                    // รวมข้อมูล donor และ antigens เข้าด้วยกันในอ็อบเจ็กต์เดียว
                    return {
                        public_id: donor.public_id,
                        donor_id: donor.donor_id,
                        fname: donor.fname,
                        lname: donor.lname,
                        gr: donor.gr,
                        rh: donor.rh,
                        ...matchingAntigen // รวมฟิลด์ antigen ถ้ามี
                    };
                });

                res.status(200).json(response);
            });
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

