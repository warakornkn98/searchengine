import React, { useRef } from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const MINORBLOODGROUP_MAPPING = {
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
  const printRef = useRef();

  const minorBloodGroupInfo = (data.minorBloodGroups || [])
    .filter(group => group.status)
    .map(group => {
      const mappedName = MINORBLOODGROUP_MAPPING[group.name] || group.name;
      return `${mappedName}${group.status}`;
    })
    .join(", ");

  const printSection = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  /*const printInfo = () => {
    const printContents = ` ชื่อ: ${data.fname || "N/A"} นามสกุล: ${
      data.lname || "N/A"
    } เลขประจำตัวประชาชน: ${data.public_id || "N/A"} Donor ID: ${
      data.donor_id || "N/A"
    } กรุ๊ปเลือด: ${data.gr || "N/A"} RH: ${data.rh || "N/A"} กรุ๊ปเลือดย่อย: ${
      minorBloodGroupInfo || "ไม่มีข้อมูล"
    } `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<pre>" + printContents + "</pre>");
    printWindow.document.close();
    printWindow.print();
  }; */

  return (
    <Row justify="center" style={{ marginTop: "50px", padding: "0 20px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <div ref={printRef}>
          {/* Card 1: ข้อมูลผู้บริจาค */}
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
            title="ข้อมูลผู้บริจาค"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  ชื่อ:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>{data.fname || "N/A"}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  นามสกุล:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>{data.lname || "N/A"}</Text>
              </Col>
              <Col xs={24}>
                <Text strong style={{ fontSize: "16px" }}>
                  เลขประจำตัวประชาชน:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>
                  {data.public_id || "N/A"}
                </Text>
              </Col>
            </Row>
          </Card>

          {/* Card 2: รายละเอียดผู้บริจาค */}
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
            title="รายละเอียดผู้บริจาค"
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  Donor ID:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>
                  {data.donor_id || "N/A"}
                </Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  กรุ๊ปเลือด:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>{data.gr || "N/A"}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text strong style={{ fontSize: "16px" }}>
                  RH:
                </Text>{" "}
                <Text style={{ fontSize: "16px" }}>{data.rh || "N/A"}</Text>
              </Col>
            </Row>
            <Title level={5} style={{ marginTop: "20px", fontSize: "16px" }}>
              กรุ๊ปเลือดย่อย
            </Title>
            <Text style={{ fontSize: "16px" }}>
              {minorBloodGroupInfo || "ไม่มีข้อมูล"}
            </Text>
          </Card>
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={12}>
            <Button
              onClick={() => navigate(-1)}
              type="primary"
              style={{
                borderRadius: "5px",
                width: "100%",
              }}
            >
              กลับไปหน้าค้นหา
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              onClick={printSection}
              type="default"
              style={{
                borderRadius: "5px",
                width: "100%",
              }}
            >
              พิมพ์หน้าผลลัพธ์
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ResultPage;