const printer = require("printer");

// ดึงรายการปริ้นเตอร์
exports.getPrinters = (req, res) => {
  try {
    const printers = printer.getPrinters();
    res.json(printers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// สั่งพิมพ์
exports.printDocument = (req, res) => {
  const { printerName, content } = req.body;

  if (!printerName || !content) {
    return res.status(400).json({ error: "Missing printerName or content" });
  }

  try {
    printer.printDirect({
      data: content,
      printer: printerName,
      type: "RAW",
      success: (jobID) => {
        res.json({ success: true, jobID });
      },
      error: (err) => {
        res.status(500).json({ error: err.message });
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
