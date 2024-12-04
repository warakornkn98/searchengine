import React from "react";
import { Card } from "antd";

const NewsCard = ({ title, description, image }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt="news"
          src={image || "https://via.placeholder.com/300x200"}
          style={{ height: "200px", objectFit: "cover" }}
        />
      }
      style={{ marginBottom: "20px" }}
    >
      <Card.Meta title={title} description={description} />
    </Card>
  );
};

export default NewsCard;
