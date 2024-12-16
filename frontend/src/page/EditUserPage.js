import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  message,
  Button,
  Typography,
  Card,
  Form,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const EditUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null); // ตัวแปรสำหรับเก็บข้อมูลผู้ใช้
  const navigate = useNavigate();
  const { userId } = useParams();

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก API
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      console.log("User data:", response.data);
      setUserData(response.data); // ตั้งค่า userData หลังจากได้รับข้อมูล
      form.setFieldsValue(response.data); // เติมข้อมูลลงในฟอร์ม
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.error || "Failed to fetch user data");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchUserData(userId); // Fetch user data when the component loads
  }, [userId]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, values);
      message.success("แก้ไขข้อมูลสำเร็จ");
      navigate("/manage-users");
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // หากยังไม่โหลดข้อมูลแสดง Loading
  }

  return (
    <div style={{ padding: "20px", fontSize: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card bordered style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
              แก้ไขข้อมูลสมาชิก
            </Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
              <Row justify="center" gutter={16}>
                <Col>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    บันทึก
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => form.resetFields()}>ล้างข้อมูล</Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditUserPage;
