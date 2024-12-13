import React from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../component/ComponentToPrint";

const PrintPage = () => {
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log("Printing completed.");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("Preparing to print...");
  }, []);

  const printFn = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PrintDocument",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  return (
    <div>
      <h1>React-to-Print Example</h1>
      <button onClick={printFn} style={{ margin: "20px", padding: "10px" }}>
        Print
      </button>
      <ComponentToPrint ref={componentRef} />
    </div>
  );
};

export default PrintPage;
