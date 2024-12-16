import React, { useEffect, useState } from 'react';
import { Carousel, Spin, Alert } from 'antd';
import axios from 'axios';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะ Loading
  const [error, setError] = useState(null);    // สถานะ Error

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then((response) => {
        setBanners(response.data);
        setLoading(false); // หยุด Loading เมื่อดึงข้อมูลสำเร็จ
      })
      .catch((error) => {
        console.error('Error fetching banners:', error);
        setError('Failed to fetch banners. Please try again later.');
        setLoading(false); // หยุด Loading เมื่อเกิดข้อผิดพลาด
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <Carousel autoplay>
      {banners.map((banner) => (
        <div key={banner.id} style={{ position: 'relative' }}>
          <img
            src={`http://localhost:5000${banner.image_url}`} // ใช้ Base URL และ image_url จาก API
            alt={banner.title}
            style={{
              width: '100%', // กำหนดให้ภาพเต็มความกว้าง
              height: '600px', // กำหนดความสูงของแบนเนอร์เป็น 600px
              objectFit: 'cover', // ทำให้รูปภาพเต็มพื้นที่โดยไม่ขยายภาพ
              borderRadius: '10px', // มุมโค้งของภาพ
            }}
          />
          <h3
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            {banner.title}
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
