import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  message,
  Button,
  Typography,
  Card,
  Form,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        values
      );
      message.success("สมัครสมาชิกสำเร็จ");
      form.resetFields();
      navigate("/login");
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setLoading(false);
    }
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
              สมัครสมาชิก
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ fontSize: 20 }}
            >
              {[ // User details fields
                { name: "username", label: "Username", placeholder: "กรอก Username" },
                { name: "password", label: "Password", placeholder: "กรอก Password", type: "password" },
                { name: "fname", label: "ชื่อ", placeholder: "กรอกชื่อ" },
                { name: "lname", label: "นามสกุล", placeholder: "กรอกนามสกุล" },
                { name: "email", label: "Email", placeholder: "กรอก Email", type: "email" },
                { name: "phone", label: "เบอร์โทรศัพท์", placeholder: "กรอกเบอร์โทรศัพท์", type: "tel" },
                { name: "hospital", label: "โรงพยาบาล", placeholder: "กรอกชื่อโรงพยาบาล" },
                { name: "department", label: "หน่วยงาน", placeholder: "กรอกชื่อหน่วยงาน" },
                { name: "position", label: "ตำแหน่ง", placeholder: "กรอกตำแหน่ง" },
              ].map((field) => (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[
                    { required: true, message: `โปรดกรอก ${field.label}` },
                  ]}
                >
                  <Input
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    style={{ fontSize: 18 }}
                  />
                </Form.Item>
              ))}

              <Form.Item>
                <Row justify="center" gutter={16}>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{ fontSize: 18 }}
                    >
                      สมัครสมาชิก
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => form.resetFields()}
                      style={{ fontSize: 18 }}
                    >
                      ล้างข้อมูล
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
