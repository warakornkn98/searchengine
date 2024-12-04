import React, { useState } from "react";
import { Input, Row, Col, message, Button, Typography, Card, Form, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const AddBloodInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/addbloodinfo", values);
      message.success("เพิ่มข้อมูลสำเร็จ");
      form.resetFields();
      navigate("/search"); // กลับไปยังหน้าค้นหา
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
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
              เพิ่มข้อมูลหมู่เลือด
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ fontSize: 20 }}
            >
              {[ 
                { name: "public_id", label: "Public ID", placeholder: "กรอก Public ID" },
                { name: "donor_id", label: "Donor ID", placeholder: "กรอก Donor ID" },
                { name: "fname", label: "ชื่อ", placeholder: "กรอกชื่อ" },
                { name: "lname", label: "นามสกุล", placeholder: "กรอกนามสกุล" },
                {
                  name: "gr", label: "กรุ๊ปเลือด", placeholder: "เลือกกรุ๊ปเลือด", type: "select", options: ["A", "B", "AB", "O"]
                },
                {
                  name: "rh", label: "RH", placeholder: "เลือก RH", type: "select", options: ["Positive", "Negative"]
                }
              ].map((field) => (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  rules={[{ required: true, message: `โปรดกรอก ${field.label}` }]}
                >
                  {field.type === "select" ? (
                    <Select placeholder={field.placeholder} style={{ fontSize: 18 }}>
                      {field.options.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input placeholder={field.placeholder} style={{ fontSize: 18 }} />
                  )}
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
                      บันทึก
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

export default AddBloodInfoPage;
