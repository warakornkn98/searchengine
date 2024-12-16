import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ManageBannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/banner');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleAddBanner = async (values) => {
    try {

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image.file.originFileObj);

      await axios.post('http://localhost:5000/api/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Banner added successfully!');
      fetchBanners();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding banner:', error);
      message.error('Failed to add banner!');
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/banner/${id}`);
      message.success('Banner deleted successfully!');
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      message.error('Failed to delete banner!');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => <img src={text} alt="Banner" style={{ width: 100 }} />,
    },
    {
      title: 'Action',
      key: 'action',
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
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please upload an image!' }]}>
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManageBannerPage;
