import React, { useState, useEffect } from "react";
import { Input, Row, Col, message, Button, Typography, Card, Form } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const EditPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      setUserData(response.data);
      form.setFieldsValue({ username: response.data.username });
    } catch (error) {
      console.error("Error fetching user data:", error.response || error.message);
      message.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/updatePassword/${userId}`, values);
      message.success("Password updated successfully");
      navigate("/manage-user");
    } catch (error) {
      console.error("Error updating password:", error.response || error.message);
      message.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", fontSize: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card bordered style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
              แก้ไขรหัสผ่าน
            </Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="username" label="Username">
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "โปรดกรอกรหัสผ่านใหม่" }]}
              >
                <Input
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
              <Row justify="center" gutter={16}>
                <Col>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    บันทึก
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => navigate("/manage-user")}>ย้อนกลับ</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditPasswordPage;
