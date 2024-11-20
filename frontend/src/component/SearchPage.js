import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/bloodinfo', values);
      const data = response.data;
      console.log(data.length > 0);

      if (data) {
        navigate('/results', { state: { result: data } });
      } else {
        message.warning('ไม่พบข้อมูลที่ตรงกับการค้นหา');
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col span={12}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="เลขประจำตัวประชาชน"
            name="public_id"
          >
            <Input placeholder="กรุณากรอกรหัสบัตรประจำตัว 13 หลัก" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              ค้นหา
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchPage;
