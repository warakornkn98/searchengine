import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import Banner from "../component/Banner";
import NewsCard from "../component/NewsCard";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ดึงข้อมูลข่าวสารจาก API
    axios
      .get("https://api.example.com/news") // เปลี่ยน URL ตาม API ของคุณ
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Banner />
      <div style={{ padding: "20px" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]}>
            {news.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <NewsCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
