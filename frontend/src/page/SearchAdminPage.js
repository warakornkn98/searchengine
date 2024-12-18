import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  message,
  Table,
  Button,
  Typography,
  Card,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../utils/api";

const { Title, Text } = Typography;

const SearchAdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useState(() => {
    const savedParams = localStorage.getItem("searchParams");
    return savedParams
      ? JSON.parse(savedParams)
      : {
          public_id: "",
          donor_id: "",
          fname: "",
          lname: "",
        };
  });
  const navigate = useNavigate();

  const columns = [
    { title: "Public ID", dataIndex: "public_id", key: "public_id" },
    { title: "Donor ID", dataIndex: "donor_id", key: "donor_id" },
    { title: "ชื่อ", dataIndex: "fname", key: "fname" },
    { title: "นามสกุล", dataIndex: "lname", key: "lname" },
    { title: "กรุ๊ปเลือด", dataIndex: "gr", key: "gr" },
    { title: "RH", dataIndex: "rh", key: "rh" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/bloodinfo");
        const responseData = response.data;
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error(error);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("searchParams", JSON.stringify(searchParams));
  }, [searchParams]);

  const handleSearchChange = (e, field) => {
    const value = e.target.value;
    setSearchParams((prevState) => {
      const newParams = { ...prevState, [field]: value };
      filterData(newParams);
      return newParams;
    });
  };

  const filterData = (searchParams) => {
    const filtered = data.filter(
      (item) =>
        item.public_id.includes(searchParams.public_id) &&
        item.donor_id.includes(searchParams.donor_id) &&
        item.fname.toLowerCase().includes(searchParams.fname.toLowerCase()) &&
        item.lname.toLowerCase().includes(searchParams.lname.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleClear = () => {
    const defaultParams = {
      public_id: "",
      donor_id: "",
      fname: "",
      lname: "",
    };
    setSearchParams(defaultParams);
    setFilteredData(data);
    localStorage.removeItem("searchParams");
  };

  const handleRowClick = (result) => {
    navigate("/results", { state: { result } });
  };

  return (
    <div style={{ padding: "20px", fontSize: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            bordered={true}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <Title
              level={4}
              style={{
                fontSize: 20,
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              ค้นหาข้อมูลหมู่เลือดย่อย
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {["public_id", "donor_id", "fname", "lname"].map(
                (field, index) => (
                  <Col span={12} key={index}>
                    <label>
                      {field === "public_id"
                        ? "Public ID:"
                        : field === "donor_id"
                        ? "Donor ID:"
                        : field === "fname"
                        ? "ชื่อ:"
                        : "นามสกุล:"}
                    </label>
                    <Input
                      placeholder={`ค้นหาจาก ${
                        field === "public_id"
                          ? "Public ID"
                          : field === "donor_id"
                          ? "Donor ID"
                          : field === "fname"
                          ? "ชื่อ"
                          : "นามสกุล"
                      }`}
                      value={searchParams[field]}
                      onChange={(e) => handleSearchChange(e, field)}
                      style={{ fontSize: 20 }}
                    />
                  </Col>
                )
              )}
            </Row>
            <Row justify="center" style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={handleClear}
                style={{
                  fontSize: 20,
                  borderRadius: "5px",
                }}
              >
                เคลียร์
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="public_id"
            loading={loading}
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            className="custom-table"
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchAdminPage;
