const express = require("express");
const router = express.Router();
const printerController = require("../controllers/printerController");

// Route สำหรับดึงรายการปริ้นเตอร์
router.get("/printers", printerController.getPrinters);

// Route สำหรับสั่งพิมพ์
router.post("/print", printerController.printDocument);

module.exports = router;
