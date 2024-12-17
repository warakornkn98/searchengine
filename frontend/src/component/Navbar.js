import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Button,
  Space,
  Dropdown,
  Menu,
  Drawer,
  Grid,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  PlusOutlined,
  MenuOutlined,
  UsergroupAddOutlined, // เพิ่มไอคอนสำหรับ Manage User
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, userData } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const handleLogout = () => logout(navigate);

  // เมนูสำหรับผู้ใช้ที่ล็อกอิน
  const profileMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} onClick={() => navigate("/profile")}>
        โปรไฟล์
      </Menu.Item>
      <Menu.Item
        icon={<SearchOutlined />}
        onClick={() => navigate("/admin/search")}
      >
        ค้นหาข้อมูลเลือด
      </Menu.Item>
      <Menu.Item
        icon={<SettingOutlined />}
        onClick={() => navigate("/settings")}
      >
        ตั้งค่า
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} danger onClick={handleLogout}>
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  const renderLinks = (isDrawer = false) => (
    <>
      <MenuLink
        to="/"
        icon={<HomeOutlined />}
        label="Home"
        isDrawer={isDrawer}
      />
      {isAuthenticated ? (
        <>
          <MenuLink
            to="/admin/search"
            icon={<SearchOutlined />}
            label="ดูข้อมูลเลือด"
            isDrawer={isDrawer}
          />
          <MenuLink
            to="/admin/addbloodinfo"
            icon={<PlusOutlined />}
            label="เพิ่มข้อมูลเลือด"
            isDrawer={isDrawer}
          />
          {/* ตรวจสอบ role ก่อนแสดงแท็บ จัดการผู้ใช้ */}
          {userData?.role === "admin" && (
            <>
            <MenuLink
              to="/manage-user"
              icon={<UsergroupAddOutlined />}
              label="จัดการผู้ใช้"
              isDrawer={isDrawer}
            />
            <MenuLink
              to="/admin/banner"
              icon={<UsergroupAddOutlined />}
              label="จัดการแบนเนอร์"
              isDrawer={isDrawer}
            />
            </>
          )}
          {isDrawer ? (
            <>
              <MenuLink
                to="/profile"
                icon={<UserOutlined />}
                label="โปรไฟล์"
                isDrawer={isDrawer}
              />
              <Button
                type="text"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ textAlign: "left" }}
              >
                ออกจากระบบ
              </Button>
            </>
          ) : (
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Space>
                <Avatar style={{ backgroundColor: "#87d068" }} />
                <span style={{ color: "white" }}>{userData?.username || "ชื่อผู้ใช้"}</span>
              </Space>
            </Dropdown>
          )}
        </>
      ) : (
        <>
          <MenuLink
            to="/search"
            icon={<SearchOutlined />}
            label="ดูข้อมูลเลือด"
            isDrawer={isDrawer}
          />
          <MenuLink
            to="/Login"
            icon={<LoginOutlined />}
            label="Admin"
            isDrawer={isDrawer}
          />
        </>
      )}
    </>
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
        alt="Logo"
        style={{ height: "40px" }}
      />
      {screens.lg ? (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {renderLinks()}
        </div>
      ) : (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white" }} />}
            onClick={() => setDrawerVisible(true)}
          />
          <Drawer
            title="เมนู"
            placement="right"
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {renderLinks(true)}
            </div>
          </Drawer>
        </>
      )}
    </Header>
  );
};

const MenuLink = ({ to, icon, label, isDrawer }) => (
  <Link
    to={to}
    style={{
      color: isDrawer ? "#001529" : "white",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      padding: isDrawer ? "10px 0" : "0",
    }}
  >
    {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}
    {label}
  </Link>
);

export default Navbar;
