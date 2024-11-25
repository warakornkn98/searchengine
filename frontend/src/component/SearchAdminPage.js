import React, { useState, useEffect } from 'react';
import { Input, Row, Col, message, Table } from "antd";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SearchAdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    public_id: '',
    donor_id: '',
    fname: '',
    lname: '',
  });
  const navigate = useNavigate();

  const columns = [
    {
      title: "Public ID",
      dataIndex: "public_id",
      key: "public_id",
    },
    {
      title: "Donor ID",
      dataIndex: "donor_id",
      key: "donor_id",
    },
    {
      title: "ชื่อ",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "กรุ๊ปเลือด",
      dataIndex: "gr",
      key: "gr",
    },
    {
      title: "RH",
      dataIndex: "rh",
      key: "rh",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/bloodinfo');
        const responseData = response.data;

        setData(responseData);
        setFilteredData(responseData);
        console.log(responseData);

      } catch (error) {
        console.error(error);
        message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e, field) => {
    const value = e.target.value;
    setSearchParams(prevState => {
      const newParams = { ...prevState, [field]: value };
      filterData(newParams);
      return newParams;
    });
  };

  const filterData = (searchParams) => {
    const filtered = data.filter(item =>
      (item.public_id.includes(searchParams.public_id) &&
      item.donor_id.includes(searchParams.donor_id) &&
      item.fname.toLowerCase().includes(searchParams.fname.toLowerCase()) &&
      item.lname.toLowerCase().includes(searchParams.lname.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (result) => {
    // นำข้อมูลของแถวไปส่งใน state ของหน้า /results
    navigate('/results', { state: { result } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" style={{ marginBottom: "20px", gap: "20px" }}>
        <Col span={9}>
          <label>Public ID:</label>
          <Input
            placeholder="ค้นหาจาก Public ID"
            value={searchParams.public_id}
            onChange={(e) => handleSearchChange(e, 'public_id')}
          />
        </Col>
        <Col span={9}>
          <label>Donor ID:</label>
          <Input
            placeholder="ค้นหาจาก Donor ID"
            value={searchParams.donor_id}
            onChange={(e) => handleSearchChange(e, 'donor_id')}
          />
        </Col>
        <Col span={9}>
          <label>ชื่อ:</label>
          <Input
            placeholder="ค้นหาจาก ชื่อ"
            value={searchParams.fname}
            onChange={(e) => handleSearchChange(e, 'fname')}
          />
        </Col>
        <Col span={9}>
          <label>นามสกุล:</label>
          <Input
            placeholder="ค้นหาจาก นามสกุล"
            value={searchParams.lname}
            onChange={(e) => handleSearchChange(e, 'lname')}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="public_id"
            loading={loading}
            onRow={(record) => ({
              onClick: () => handleRowClick(record), // เมื่อคลิกแถวจะนำข้อมูลไปยัง /results
            })}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchAdminPage;
