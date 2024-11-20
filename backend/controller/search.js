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
