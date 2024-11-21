import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Row, Col, message, Table } from "antd";
import axios from "axios";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // เก็บข้อมูลผลลัพธ์ทั้งหมด
  const [filteredData, setFilteredData] = useState([]); // เก็บข้อมูลที่กรองแล้ว
  const [searchKeyword, setSearchKeyword] = useState(""); // เก็บคำค้นหา

  const columns = [
    {
      title: "Public ID",
      dataIndex: "public_id",
      key: "public_id",
    },
    {
      title: "Donor ID",
      dataIndex: "donor_id",
      key: "donor_id",
    },
    {
      title: "ชื่อ",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "กรุ๊ปเลือด",
      dataIndex: "gr",
      key: "gr",
    },
    {
      title: "RH",
      dataIndex: "rh",
      key: "rh",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/bloodinfo');
        const responseData = response.data;

        setData(responseData); // เก็บข้อมูลทั้งหมด
        setFilteredData(responseData); // เริ่มต้นแสดงข้อมูลทั้งหมด
        console.log(responseData);
        
      } catch (error) {
        console.error(error);
        message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);


  const handleKeywordChange = (e) => {
    const keyword = e.target.value; // แปลงคำค้นหาเป็นตัวพิมพ์เล็ก
    setSearchKeyword(keyword);

    // กรองข้อมูลตามคำค้นหา
    const filtered = data.filter(
      (item) =>
        
        item.fname.toLowerCase().includes(keyword) || // กรองด้วยชื่อ
        item.lname.toLowerCase().includes(keyword) || // กรองด้วยนามสกุล
        item.public_id.includes(keyword) // กรองด้วย public_id
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Input
            placeholder="กรอกคำค้นหา (ชื่อ, นามสกุล, หรือ Public ID)"
            value={searchKeyword}
            onChange={handleKeywordChange}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="public_id"
            loading={loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
