import React, { useContext } from "react";
import { Layout, Avatar, Button, Space, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "./AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(navigate);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
        โปรไฟล์
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate("/settings")}>
        ตั้งค่า
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
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
      {/* Logo */}
      <div style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          MyApp
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/" style={{ color: "white", display: "flex", alignItems: "center", textDecoration: "none" }}>
          <HomeOutlined style={{ marginRight: "5px" }} />
          Home
        </Link>
        <Link to="/search" style={{ color: "white", display: "flex", alignItems: "center", textDecoration: "none" }}>
          <SearchOutlined style={{ marginRight: "5px" }} />
          ดูข้อมูลเลือด
        </Link>
        <Link to="/adminsearch" style={{ color: "white", display: "flex", alignItems: "center", textDecoration: "none" }}>
          <SearchOutlined style={{ marginRight: "5px" }} />
          ดูข้อมูลเลือด Admin
        </Link>

        {/* Conditional Rendering for Login/Logout */}
        {isLoggedIn ? (
          <Dropdown overlay={profileMenu} placement="bottomRight" trigger={['click']}>
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
