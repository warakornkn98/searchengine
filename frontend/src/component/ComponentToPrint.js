import React from "react";

const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ padding: "20px", fontSize: "18px" }}>
      <h1>Printable Content</h1>
      <p>This content will be printed using the `react-to-print` library.</p>
    </div>
  );
});

export default ComponentToPrint;
