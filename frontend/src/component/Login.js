import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  // ตรวจสอบสถานะการเข้าสู่ระบบ
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/search"); // เปลี่ยนเส้นทางไปหน้า /search
    }
  }, [isLoggedIn, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    await login(values.username, values.password, navigate);
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card title="เข้าสู่ระบบ" style={{ width: 400 }}>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ชื่อผู้ใช้"
            name="username"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้!" }]}
          >
            <Input placeholder="ชื่อผู้ใช้" />
          </Form.Item>

          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน!" }]}
          >
            <Input.Password placeholder="รหัสผ่าน" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
