import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://your-api-endpoint/login', {
        username: values.username,
        password: values.password,
      });

      localStorage.setItem('userData.token', response.data.token);
      message.success('เข้าสู่ระบบสำเร็จ');

      navigate('/');
    } catch (error) {
      console.error(error);
      message.error('เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}
          >
            <Input placeholder="ชื่อผู้ใช้" />
          </Form.Item>

          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
          >
            <Input.Password placeholder="รหัสผ่าน" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
