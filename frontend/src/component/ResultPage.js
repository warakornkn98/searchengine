import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Antigen mapping
const ANTIGEN_MAPPING = {
  Lea: "Lea",
  Leb: "Leb",
  mia: "mia",
  E: "E",
  D: "D",
  ee: "e",
  C: "C",
  cc: "c",
  P1: "P1",
  I: "I",
  M: "M",
  N: "N",
  S: "S",
  ss: "s",
  Fya: "Fya",
  Fyb: "Fyb",
  Dia: "Dia",
  Dib: "Dib",
  Jka: "Jka",
  Jkb: "Jkb",
  K: "K",
  kk: "k",
  Xga: "Xga",
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.result || {};

  // Map antigens to their key and value ("+" or "-")
  const antigenInfo = Object.entries(data)
    .filter(([key, value]) => ANTIGEN_MAPPING[key] && (value === "+" || value === "-"))
    .map(([key, value]) => `${ANTIGEN_MAPPING[key]}${value}`)
    .join(", ");

  return (
    <Row justify="center" style={{ marginTop: "50px"}}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          title={<Title level={4} style={{ fontSize: 20 }}>รายละเอียดผู้บริจาค</Title>}
          bordered={true}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row gutter={[16, 16]} >
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>Public ID:</Text>
              <p style={{ fontSize: 20 }}>{data.public_id || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>Donor ID:</Text>
              <p style={{ fontSize: 20 }}>{data.donor_id || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>ชื่อ:</Text>
              <p style={{ fontSize: 20 }}>{data.fname || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>นามสกุล:</Text>
              <p style={{ fontSize: 20 }}>{data.lname || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>กรุ๊ปเลือด:</Text>
              <p style={{ fontSize: 20 }}>{data.gr || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong style={{ fontSize: 20 }}>RH:</Text>
              <p style={{ fontSize: 20 }}>{data.rh || "N/A"}</p>
            </Col>
          </Row>

          <Title level={5} style={{ marginTop: "20px",fontSize: 20 }}>
            กรุ๊ปเลือดย่อย
          </Title>
          <Text style={{ fontSize: 20 }}>{antigenInfo || "ไม่มีข้อมูล"}</Text>
        </Card>

        <Button
          onClick={() => navigate(-1)}
          type="primary"
          style={{
            marginTop: "20px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          กลับไปหน้าค้นหา
        </Button>
      </Col>
    </Row>
  );
};

export default ResultPage;
