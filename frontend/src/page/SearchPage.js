import React, { useState } from "react";
import { Layout, Input, Button, Form, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const { Content } = Layout;

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [publicId, setPublicId] = useState(""); // ประกาศ state ใหม่
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (parseInt(captchaInput) !== captchaQuestion.answer) {
      message.error("CAPTCHA ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      setCaptchaQuestion(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        `/bloodinfo`,
        values
      );
      const data = response.data;

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

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    return {
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
    };
  }

  return (
    <Layout>
      <Content style={{ padding: "50px", background: "#f0f2f5" }}>
        <h1
          style={{
            color: "#001529",
            textAlign: "center",
            margin: "20px",
            fontSize: "24px",
          }}
        >
          ระบบค้นหาข้อมูลผู้บริจาคโลหิต
        </h1>
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
                  maxLength={13} // ล็อกให้กรอกได้แค่ 13 ตัวอักษร
                  inputMode="numeric" // กำหนดให้มีแป้นพิมพ์ที่เป็นตัวเลข
                  value={publicId} // ใช้ค่าจาก state
                  autoComplete="off"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // กรองค่าเพื่อรับเฉพาะตัวเลข
                    const filteredValue = inputValue.replace(/[^0-9]/g, "");

                    // อัพเดทค่าที่กรอกใน state เท่านั้น (แค่ตัวเลข)
                    setPublicId(filteredValue);

                    // ไม่เก็บค่าอักขระที่ไม่ใช่ตัวเลข
                    // ถ้าไม่ใช่ตัวเลข จะไม่อัพเดทค่าเลย
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // ป้องกันการพิมพ์อักขระที่ไม่ใช่ตัวเลข
                    }
                  }}
                />
              </Form.Item>

              <Form.Item label={`ผลลัพธ์ของ ${captchaQuestion.question} คือ`}>
                <Input
                  placeholder="กรุณากรอกผลลัพธ์"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
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
                  loading={loading}
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
