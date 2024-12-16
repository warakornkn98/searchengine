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
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        values
      );
      
      message.success("สมัครสมาชิกสำเร็จ");
      form.resetFields();
      navigate("/login");
    }  catch (error) {
      console.error("Error details:", error.response || error.message);
      message.error("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }finally {
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
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: "โปรดกรอก Username" }]}
                  >
                    <Input placeholder="กรอก Username" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "โปรดกรอก Email" }]}
                  >
                    <Input
                      placeholder="กรอก Email"
                      type="email"
                      style={{ fontSize: 18 }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "โปรดกรอกรหัสผ่าน" }]}
                  >
                    <Input
                      placeholder="กรอกรหัสผ่าน"
                      type={passwordVisible ? "text" : "password"}
                      style={{ fontSize: 18 }}
                      suffix={
                        <Button
                          type="text"
                          icon={passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    label="ยืนยันรหัสผ่าน"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      { required: true, message: "โปรดยืนยันรหัสผ่าน" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="ยืนยันรหัสผ่าน"
                      type={confirmPasswordVisible ? "text" : "password"}
                      style={{ fontSize: 18 }}
                      suffix={
                        <Button
                          type="text"
                          icon={confirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="fname"
                    label="ชื่อ"
                    rules={[{ required: true, message: "โปรดกรอกชื่อ" }]}
                  >
                    <Input placeholder="กรอกชื่อ" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lname"
                    label="นามสกุล"
                    rules={[{ required: true, message: "โปรดกรอกนามสกุล" }]}
                  >
                    <Input placeholder="กรอกนามสกุล" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="เบอร์โทรศัพท์"
                    rules={[{ required: true, message: "โปรดกรอกเบอร์โทรศัพท์" }]}
                  >
                    <Input
                      placeholder="กรอกเบอร์โทรศัพท์"
                      type="tel"
                      style={{ fontSize: 18 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="agency"
                    label="โรงพยาบาล"
                    rules={[{ required: true, message: "โปรดกรอกชื่อโรงพยาบาล" }]}
                  >
                    <Input placeholder="กรอกชื่อโรงพยาบาล" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="department"
                    label="แผนก/หน่วยงาน"
                    rules={[{ required: true, message: "โปรดกรอกแผนก/หน่วยงาน" }]}
                  >
                    <Input placeholder="กรอกแผนก/หน่วยงาน" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="position"
                    label="ตำแหน่ง"
                    rules={[{ required: true, message: "โปรดกรอกตำแหน่ง" }]}
                  >
                    <Input placeholder="กรอกตำแหน่ง" style={{ fontSize: 18 }} />
                  </Form.Item>
                </Col>
              </Row>

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
