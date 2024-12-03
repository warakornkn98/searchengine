import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

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
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            title={
              <Title level={4} style={{ textAlign: "center", fontSize: 20, marginBottom: 0 }}>
                รายละเอียดผู้บริจาค
              </Title>
            }
            bordered={true}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Public ID:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.public_id || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text strong>Donor ID:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.donor_id || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text strong>ชื่อ:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.fname || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text strong>นามสกุล:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.lname || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text strong>กรุ๊ปเลือด:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.gr || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text strong>RH:</Text>
                <Paragraph style={{ fontSize: 20, margin: 0 }}>
                  {data.rh || "ไม่มีข้อมูล"}
                </Paragraph>
              </Col>
            </Row>

            <div style={{ marginTop: "20px" }}>
              <Title level={5} style={{ fontSize: 20 }}>
                กรุ๊ปเลือดย่อย
              </Title>
              <Text style={{ fontSize: 20, color: antigenInfo ? "#000" : "#999" }}>
                {antigenInfo || "ไม่มีข้อมูล"}
              </Text>
            </div>
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
    </div>
  );
};

export default ResultPage;
