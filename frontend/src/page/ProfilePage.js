import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Skeleton } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: "50px", padding: "0 20px" }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Skeleton active />
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: "50px", padding: "0 20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          style={{
            marginBottom: "20px",
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
          }}
          headStyle={{
            backgroundColor: "#e6f7ff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          title="โปรไฟล์ผู้ใช้งาน"
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>ชื่อ:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.fname || "N/A"}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>นามสกุล:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.lname || "N/A"}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>Username:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.username || "N/A"}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>ตำแหน่ง:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.position || "N/A"}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>หน่วยงาน:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.agency || "N/A"}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: "16px" }}>แผนก:</Text>{" "}
              <Text style={{ fontSize: "16px" }}>{userData.department || "N/A"}</Text>
            </Col>
          </Row>
        </Card>

        <Button
          type="primary"
          onClick={() => window.location.reload()} // Reload to simulate a "Log out" or refresh action
          style={{
            marginTop: "20px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          รีเฟรชข้อมูล
        </Button>
      </Col>
    </Row>
  );
};

export default ProfilePage;
