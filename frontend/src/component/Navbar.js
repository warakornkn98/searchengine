import React, { useContext } from "react";
import { Layout, Avatar, Button, Space, Dropdown, Menu, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout(navigate);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        โปรไฟล์
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => navigate("/settings")}
      >
        ตั้งค่า
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        danger
        onClick={handleLogout}
      >
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: "#001529",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <img
        src="https://www.psu.ac.th/img/logos/psu_th.webp"
        alt="Ant Design Logo"
        style={{ height: '40px' }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <HomeOutlined style={{ marginRight: "5px" }} />
          Home
        </Link>
        <Link
          to="/search"
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <SearchOutlined style={{ marginRight: "5px" }} />
          ดูข้อมูลเลือด
        </Link>

        {isAuthenticated ? (
          <Dropdown
            overlay={profileMenu}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space>
              <Avatar style={{ backgroundColor: "#87d068" }} />
              <span style={{ color: "white" }}>ชื่อผู้ใช้</span>
            </Space>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
            style={{ borderRadius: "5px" }}
          >
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
