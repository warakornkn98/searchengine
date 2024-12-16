import React from 'react';
import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;

const FooterComponents = () => (
    <Footer style={{ background: '#001529', color: 'white', textAlign: 'center', margin: '20px 0 0 0' }}>
        <Row>
            <Col span={24}>
                <div>
                    <p>โรงพยาบาลสงขลานครินทร์ องค์กรวิจัยนำ</p>
                    <p>ที่อยู่: 15 ถนน กาญจนวนิชย์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา 90110</p>
                    <p>โทรศัพท์ : 074 - 451040</p>
                    <p>อีเมล : Premium@medicine.psu.ac.th</p>
                </div>
                <div>
                    <p>การเดินทาง:</p>
                    {/* Place your map here */}
                </div>
                <div>
                    <p>Follow us:</p>
                    {/* Place social media icons here */}
                </div>
                <div>
                    <p>© 2024 Faculty of Medicine, Prince of Songkla University</p>
                </div>
            </Col>
        </Row>
    </Footer>
);

export default FooterComponents;
