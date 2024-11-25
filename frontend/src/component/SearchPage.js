import React, { useState } from "react";
import { Layout, Input, Button, Form, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const { Header, Content } = Layout;

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bloodinfo",
        values
      );
      const data = response.data;
      console.log(data.length > 0);

      if (data) {
        navigate("/results", { state: { result: data } });
      } else {
        message.warning("ไม่พบข้อมูลที่ตรงกับการค้นหา");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header style={{ background: "#001529"}}>
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            margin: 0,
            fontSize: "24px",
          }}
        >
          ระบบค้นหาข้อมูลผู้บริจาคโลหิต
        </h1>
      </Header>

      <Content style={{ padding: "50px", background: "#f0f2f5" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Form
              onFinish={onFinish}
              layout="vertical"
              style={{
                padding: "20px",
                background: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Form.Item
                label="เลขประจำตัวประชาชน"
                name="public_id"
                rules={[
                  { required: true, message: "กรุณากรอกเลขประจำตัวประชาชน" },
                  {
                    pattern: /^[0-9]{13}$/,
                    message: "เลขประจำตัวประชาชนต้องเป็นตัวเลข 13 หลัก",
                  },
                ]}
              >
                <Input
                  placeholder="กรุณากรอกรหัสบัตรประจำตัว 13 หลัก"
                  style={{ height: "50px", fontSize: "16px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    height: "45px",
                    fontSize: "16px",
                    width: "100%",
                  }}
                >
                  ค้นหา
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchPage;
