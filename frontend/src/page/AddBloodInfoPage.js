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
  Select,
  Tag,
  Modal,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const AddBloodInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedMinorBloodGroups, setSelectedMinorBloodGroups] = useState([]);
  const [selectedMinorBloodGroup, setSelectedMinorBloodGroup] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigate = useNavigate();

  const minorBloodGroupsList = [
    "Lea",
    "Leb",
    "mia",
    "E",
    "D",
    "ee",
    "C",
    "cc",
    "P1",
    "I",
    "M",
    "N",
    "S",
    "ss",
    "Fya",
    "Fyb",
    "Dia",
    "Dib",
    "Jka",
    "Jkb",
    "K",
    "kk",
    "Xga",
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    const requestData = { ...values, minorBloodGroups: selectedMinorBloodGroups };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addbloodinfo",
        requestData
      );

      message.success("เพิ่มข้อมูลสำเร็จ");
      form.resetFields();
      setSelectedMinorBloodGroups([]);
      navigate("/admin/addbloodinfo");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const existingData = error.response.data.existingData;
        const newData = { ...values, minorBloodGroups: selectedMinorBloodGroups };

        Modal.confirm({
          title: "พบข้อมูลซ้ำ",
          content: (
            <div>
              <p>
                <strong>ข้อมูลที่มีอยู่ในระบบ:</strong>
              </p>
              {existingData && typeof existingData === "object" ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        ฟิลด์
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        ค่า
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(existingData).map(([key, value]) => {
                      if (key === "minorBloodGroups") {
                        const filteredGroups = value
                          .filter((group) => group.status !== null)
                          .map(
                            (group) => `${group.name} ${group.status}`
                          )
                          .join(", ");

                        return (
                          <tr key={key}>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {key}
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {filteredGroups}
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={key}>
                          <td
                            style={{
                              borderBottom: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {key}
                          </td>
                          <td
                            style={{
                              borderBottom: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {JSON.stringify(value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "red" }}>ไม่มีข้อมูลที่มีอยู่ในระบบ</p>
              )}

              <p>
                <strong>ข้อมูลที่คุณพยายามเพิ่ม:</strong>
              </p>
              {newData && typeof newData === "object" ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        ฟิลด์
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          borderBottom: "1px solid #ddd",
                          padding: "8px",
                        }}
                      >
                        ค่า
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(newData).map(([key, value]) => {
                      if (key === "minorBloodGroups") {
                        const filteredGroups = value
                          .filter((group) => group.status !== null)
                          .map(
                            (group) => `${group.name} ${group.status}`
                          )
                          .join(", ");

                        return (
                          <tr key={key}>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {key}
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {filteredGroups}
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={key}>
                          <td
                            style={{
                              borderBottom: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {key}
                          </td>
                          <td
                            style={{
                              borderBottom: "1px solid #ddd",
                              padding: "8px",
                            }}
                          >
                            {JSON.stringify(value)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "red" }}>ไม่มีข้อมูลใหม่</p>
              )}

              <p>คุณต้องการอัปเดตข้อมูลเก่าหรือไม่?</p>
            </div>
          ),
          okText: "อัปเดตข้อมูล",
          cancelText: "ยกเลิก",
          onOk: async () => {
            try {
              await axios.put(
                "http://localhost:5000/api/updatebloodinfo",
                requestData
              );
              message.success("อัปเดตข้อมูลสำเร็จ");
              form.resetFields();
              setSelectedMinorBloodGroups([]);
              navigate("/search");
            } catch (updateError) {
              console.error(updateError);
              message.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
            }
          },
          onCancel: () => {
            message.info("ยกเลิกการอัปเดตข้อมูล");
          },
        });
      } else {
        console.error(error);
        message.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddMinorBloodGroup = () => {
    if (!selectedMinorBloodGroup || !selectedStatus) {
      message.error("กรุณาเลือกหมู่เลือดย่อยและสถานะ");
      return;
    }

    const existingGroupIndex = selectedMinorBloodGroups.findIndex(
      (group) => group.name === selectedMinorBloodGroup
    );

    if (existingGroupIndex !== -1) {
      const updatedGroups = [...selectedMinorBloodGroups];
      updatedGroups[existingGroupIndex] = {
        ...updatedGroups[existingGroupIndex],
        status: selectedStatus,
      };
      setSelectedMinorBloodGroups(updatedGroups);
    } else {
      setSelectedMinorBloodGroups([
        ...selectedMinorBloodGroups,
        { name: selectedMinorBloodGroup, status: selectedStatus },
      ]);
    }

    setSelectedMinorBloodGroup(null);
    setSelectedStatus(null);
  };

  const handleRemoveMinorBloodGroup = (group) => {
    setSelectedMinorBloodGroups(
      selectedMinorBloodGroups.filter((item) => item.name !== group.name)
    );
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
                {
                  name: "public_id",
                  label: "Public ID",
                  placeholder: "กรอก Public ID",
                },
                {
                  name: "donor_id",
                  label: "Donor ID",
                  placeholder: "กรอก Donor ID",
                },
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
                    style={{ fontSize: 18 }}
                  />
                </Form.Item>
              ))}

              <Form.Item label="ชื่อและนามสกุล" style={{ marginBottom: 0 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="fname"
                      rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                    >
                      <Input placeholder="กรอกชื่อ" style={{ fontSize: 18 }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lname"
                      rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                    >
                      <Input
                        placeholder="กรอกนามสกุล"
                        style={{ fontSize: 18 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="กรุ๊ปเลือดและ RH" style={{ marginBottom: 0 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="gr"
                      rules={[
                        { required: true, message: "กรุณาเลือกกรุ๊ปเลือด" },
                      ]}
                    >
                      <Select
                        placeholder="เลือกกรุ๊ปเลือด"
                        style={{ fontSize: 18 }}
                      >
                        {["A", "B", "AB", "O"].map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="rh"
                      rules={[{ required: true, message: "กรุณาเลือก RH" }]}
                    >
                      <Select placeholder="เลือก RH" style={{ fontSize: 18 }}>
                        {["+", "-"].map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                label="หมู่เลือดย่อยและสถานะ"
                style={{ marginBottom: 0 }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item>
                      <Select
                        value={selectedMinorBloodGroup}
                        placeholder="เลือกหมู่เลือดย่อย"
                        style={{ width: "100%", fontSize: 18 }}
                        onChange={(value) => setSelectedMinorBloodGroup(value)}
                      >
                        {minorBloodGroupsList.map((group) => (
                          <Option key={group} value={group}>
                            {group}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <Select
                        value={selectedStatus}
                        placeholder="เลือกสถานะ"
                        style={{ width: "100%", fontSize: 18 }}
                        onChange={(value) => setSelectedStatus(value)}
                      >
                        <Option value="+">+</Option>
                        <Option value="-">-</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleAddMinorBloodGroup}
                  style={{ fontSize: 18 }}
                >
                  เพิ่มหมู่เลือดย่อย
                </Button>
              </Form.Item>

              <Form.Item label="หมู่เลือดย่อยที่เลือก">
                {selectedMinorBloodGroups.map((group, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={() => handleRemoveMinorBloodGroup(group)}
                    style={{ marginBottom: 5 }}
                  >
                    {group.name} {group.status === "+" ? "(+)" : "(-)"}
                  </Tag>
                ))}
              </Form.Item>

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
                      onClick={() => {
                        form.resetFields();
                        setSelectedMinorBloodGroups([]);
                      }}
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