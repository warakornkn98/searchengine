import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Button, Input, message } from "antd";

const { Option } = Select;

const PrintComponent = () => {
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/printers");
        setPrinters(response.data);
      } catch (error) {
        message.error("Failed to fetch printers");
      }
    };

    fetchPrinters();
  }, []);

  const handlePrint = async () => {
    if (!selectedPrinter) {
      message.error("Please select a printer");
      return;
    }

    if (!content) {
      message.error("Please enter content to print");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/print", {
        printerName: selectedPrinter,
        content,
      });

      if (response.data.success) {
        message.success(`Print job sent successfully. Job ID: ${response.data.jobID}`);
      }
    } catch (error) {
      message.error("Failed to send print job");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Printer Manager</h2>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="Select Printer"
          style={{ width: 300 }}
          onChange={(value) => setSelectedPrinter(value)}
        >
          {printers.map((printer) => (
            <Option key={printer.name} value={printer.name}>
              {printer.name}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input.TextArea
          rows={4}
          placeholder="Enter content to print"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
};

export default PrintComponent;
