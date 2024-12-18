import React, { useState, useEffect } from "react";
import { Input, Row, Col, message, Button, Typography, Card, Form, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";

const { Title } = Typography;
const { Option } = Select;

const EditUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  const fetchUserData = async (userId) => {
    try {
      const response = await api.get(`/user/${userId}`);
      console.log("User data:", response.data);
      setUserData(response.data);
      form.setFieldsValue(response.data);
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
    fetchUserData(userId);
  }, [userId]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await api.put(`/updateUser/${userId}`, values);
      message.success("แก้ไขข้อมูลสำเร็จ");
      navigate("/manage-users");
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontSize: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card bordered style={{ borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <Title level={4} style={{ textAlign: "center", marginBottom: "20px" }}>
              แก้ไขข้อมูลสมาชิก
            </Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="fname" label="ชื่อ" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lname" label="นามสกุล" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="phone" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
                    <Input type="tel" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="agency" label="โรงพยาบาล" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="department" label="แผนก/หน่วยงาน" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="position" label="ตำแหน่ง" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Select>
                      <Option value="admin">Admin</Option>
                      <Option value="user">User</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
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

export default EditUserPage;
