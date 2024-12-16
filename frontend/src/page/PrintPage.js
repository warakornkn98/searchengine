import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./styles.css";

const PrintableComponent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>รายงาน</h1>
    <p>นี่คือหน้าสำหรับการพิมพ์</p>
  </div>
));

const App = () => {
  const componentRef = useRef(); // ใช้ useRef เพื่อสร้างตัวอ้างอิง
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // คืนค่าตัวอ้างอิงของ Component
  });

  return (
    <div>
      <button onClick={handlePrint}>พิมพ์เอกสาร</button>
      <PrintableComponent ref={componentRef} /> {/* เชื่อม ref เข้ากับ Component */}
    </div>
  );
};

export default App;
