import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../utils/api";


const ManageBannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get("/banner");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleAddBanner = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      // ตรวจสอบว่าไฟล์มีอยู่จริงใน values.image
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      } else {
        message.error("Please upload an image!");
        return;
      }

      // ส่งข้อมูลผ่าน axios
      await api.post("/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Banner added successfully!");
      fetchBanners(); // รีเฟรชรายการแบนเนอร์
      setIsModalOpen(false); // ปิด Modal
      form.resetFields(); // รีเซ็ตฟอร์ม
    } catch (error) {
      console.error("Error adding banner:", error);
      message.error("Failed to add banner!");
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await api.delete(`/banner/${id}`);
      message.success("Banner deleted successfully!");
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      message.error("Failed to delete banner!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text, record) => (
        <img src={`http://localhost:5000${record.image_url}`} alt="Banner" style={{ width: 100 }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteBanner(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Banner
      </Button>
      <Table columns={columns} dataSource={banners} rowKey="id" />

      <Modal
        title="Add Banner"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddBanner} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={() => false} // ห้ามอัปโหลดไฟล์โดยอัตโนมัติ
              maxCount={1} // อัปโหลดได้แค่ 1 ไฟล์
              showUploadList={{
                showPreviewIcon: false, // ไม่แสดงปุ่ม preview รูปภาพ
                showRemoveIcon: false, // ไม่แสดงปุ่มลบ
                showDownloadIcon: false, // ไม่แสดงปุ่มดาวน์โหลด
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageBannerPage;
