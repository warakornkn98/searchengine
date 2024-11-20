import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.result || {};
  console.log(data)

  const renderAntigenInfo = (label, value) => {
    if (value === '+' || value === '-') {
      return (
        <>
          {label}{value}
        </>
      );
    }
    return null;
  };

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col span={12}>
        <Card title="รายละเอียดผู้บริจาค" bordered={true}>
          <p><strong>Public ID:</strong> {data.donor.public_id}</p>
          <p><strong>Donor ID:</strong> {data.donor.donor_id}</p>
          <p><strong>ชื่อ:</strong> {data.donor.fname}</p>
          <p><strong>นามสกุล:</strong> {data.donor.lname}</p>
          <p><strong>กรุ๊ปเลือด:</strong> {data.donor.gr}</p>
          <p><strong>RH:</strong> {data.donor.rh}</p>

          <strong>ข้อมูล Antigen</strong> :
          {renderAntigenInfo('Lea', data.antigens.Lea)}
          {renderAntigenInfo('Leb', data.antigens.Leb)}
          {renderAntigenInfo('mia', data.antigens.mia)}
          {renderAntigenInfo('E', data.antigens.E)}
          {renderAntigenInfo('D', data.antigens.D)}
          {renderAntigenInfo('ee', data.antigens.ee)}
          {renderAntigenInfo('C', data.antigens.C)}
          {renderAntigenInfo('cc', data.antigens.cc)}
          {renderAntigenInfo('P1', data.antigens.P1)}
          {renderAntigenInfo('I', data.antigens.I)}
          {renderAntigenInfo('M', data.antigens.M)}
          {renderAntigenInfo('N', data.antigens.N)}
          {renderAntigenInfo('S', data.antigens.S)}
          {renderAntigenInfo('ss', data.antigens.ss)}
          {renderAntigenInfo('Fya', data.antigens.Fya)}
          {renderAntigenInfo('Fyb', data.antigens.Fyb)}
          {renderAntigenInfo('Dia', data.antigens.Dia)}
          {renderAntigenInfo('Dib', data.antigens.Dib)}
          {renderAntigenInfo('Jka', data.antigens.Jka)}
          {renderAntigenInfo('Jkb', data.antigens.Jkb)}
          {renderAntigenInfo('K', data.antigens.K)}
          {renderAntigenInfo('kk', data.antigens.kk)}
          {renderAntigenInfo('Xga', data.antigens.Xga)}
        </Card>
        <Button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
          กลับไปหน้าค้นหา
        </Button>
      </Col>
    </Row>
  );
};

export default ResultPage;
