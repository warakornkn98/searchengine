import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.result || {};

  // ฟอร์แมตข้อมูลกรุ๊ปเลือดย่อยให้เป็นสตริงเดียว
  const antigenInfo = Object.entries(data)
    .filter(([_, value]) => value === "+" || value === "-") // กรองค่าที่เป็น + หรือ -
    .map(([key, value]) => `${key}${value}`) // รวมชื่อของกรุ๊ปเลือดกับค่า + หรือ -
    .join(", "); // รวมเป็นสตริงเดียวกัน

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          title={<Title level={4}>รายละเอียดผู้บริจาค</Title>}
          bordered={true}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Public ID:</Text>
              <p>{data.public_id || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong>Donor ID:</Text>
              <p>{data.donor_id || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong>ชื่อ:</Text>
              <p>{data.fname || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong>นามสกุล:</Text>
              <p>{data.lname || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong>กรุ๊ปเลือด:</Text>
              <p>{data.gr || "N/A"}</p>
            </Col>
            <Col span={12}>
              <Text strong>RH:</Text>
              <p>{data.rh || "N/A"}</p>
            </Col>
          </Row>

          <Title level={5} style={{ marginTop: "20px" }}>
            กรุ๊ปเลือดย่อย
          </Title>
          <Text>{antigenInfo || "ไม่มีข้อมูล"}</Text>
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
