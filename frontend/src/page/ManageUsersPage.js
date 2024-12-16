import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ฟังก์ชั่นดึงข้อมูลสมาชิก
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users"); // API ดึงข้อมูลสมาชิกทั้งหมด
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleConfirm = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/confirm-user/${userId}`);
      message.success("ยืนยันการสมัครสมาชิกสำเร็จ");
      fetchUsers();
    } catch (error) {
      console.error(error);
      message.error("เกิดข้อผิดพลาดในการยืนยันสมาชิก");
    }
  };

  const handleEdit = (userId) => {
    console.log(userId);
    
    navigate(`/edit-profile/${userId}`);
  };

  const handleAddUser = () => {
    navigate("/add-user"); // นำทางไปหน้า AddUser
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          {record.role === null ? (
            <Popconfirm
              title="ยืนยันการสมัครสมาชิก?"
              onConfirm={() => handleConfirm(record.id)}
              okText="ใช่"
              cancelText="ยกเลิก"
            >
              <Button type="primary">ยืนยันสมัครสมาชิก</Button>
            </Popconfirm>
          ) : (
            <Button onClick={() => handleEdit(record.id)} type="primary">
              แก้ไขข้อมูล
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>จัดการข้อมูลสมาชิก</h2>
      <Button type="primary" onClick={handleAddUser} style={{ marginBottom: 20 }}>
        เพิ่มสมาชิก
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </div>
  );
};

export default ManageUsersPage;