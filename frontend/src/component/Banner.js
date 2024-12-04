import React from "react";
import { Typography, Image } from "antd";

const { Title } = Typography;

const Banner = () => {
  return (
    <div
      style={{
        background: "#1890ff",
        color: "#fff",
        padding: "50px 20px",
        textAlign: "center",
      }}
    >
      <Image
        preview={false}
        src="https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/468874899_996379619201327_5751534091052327281_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFHufsMQOygGIqyTFSHZffUu25pJpnngKe7bmkmmeeAp86Eh94TDHnKZL4nZdXFB_LXd-byqnlrNJGgUTBwCQcT&_nc_ohc=72cPow3f0ywQ7kNvgHb282h&_nc_zt=23&_nc_ht=scontent-bkk1-1.xx&_nc_gid=AJ9DPz6vNzXXWPfRcjXsyyW&oh=00_AYCOH2eTLL0RzgglDR3wp6G23SPzvT3RkLQRPcAnExr4rA&oe=67559331"
        alt="Banner"
        style={{ marginBottom: "20px", borderRadius: "8px" }}
      />
    </div>
  );
};

export default Banner;
