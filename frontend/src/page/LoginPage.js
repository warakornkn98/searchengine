import React, { useState } from "react"; // <-- Ensure useState is imported here
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Card, Form, Input, Button, message, Row, Col } from "antd"; // <-- Added Row and Col
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/search" />;
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", values);
      login(data.token);
      navigate("/admin/search");
      message.success("Login successful!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // แสดงข้อความ error จากหลังบ้าน
        message.error(error.response.data.message);
      } else {
        // แสดงข้อความ default ถ้าไม่มี error message จากหลังบ้าน
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        title="Login"
        style={{
          width: 400,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col>
                <Button type="link" htmlType="button">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
