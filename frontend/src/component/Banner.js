import React from "react";
import { Typography, Image } from "antd";

const { Title } = Typography;

const Banner = () => {
  return (
    <div
      style={{
        background: "#1890ff",
        color: "#fff",
        padding: "30px 10px", // ลด Padding
        textAlign: "center",
        maxWidth: "1200px", // กำหนดขนาดสูงสุด
        margin: "0 auto", // จัดให้อยู่ตรงกลางหน้าจอ
        borderRadius: "12px", // เพิ่มมุมโค้ง
      }}
    >
      <Image
        preview={false}
        src="https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/469117775_998209025685053_6557459382835359644_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF_XgU38DTWkq341tH7A8U_M-iixnMPTfMz6KLGcw9N855NU7SKgrpHbPyk2OWAU8GvijGWUfYowBkLqU7WmPnX&_nc_ohc=qobJwcKg-VcQ7kNvgEIzvML&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=A8V8H2u7qClsYSiwd47pPzU&oh=00_AYBSgSFwOX-pv5lPwgtK4CCK64XzIQq-L_sTwgEA7nR1rw&oe=676561DE"
        alt="Banner"
        style={{
          marginBottom: "20px",
          borderRadius: "8px",
          width: "100%", // ใช้ความกว้างเต็มพื้นที่
          maxWidth: "1200px", // ขนาดสูงสุด
          height: "auto", // ปรับสัดส่วนตามความกว้าง
        }}
      />
      <Title level={3} style={{ color: "#fff" }}>
        Welcome to Our Website
      </Title>
    </div>
  );
};

export default Banner;
