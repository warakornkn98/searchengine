import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./component/SearchPage";
import ResultPage from "./component/ResultPage";
import LoginPage from "./component/Login";
import SearchTable from "./component/SearchTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<SearchTable />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/search_" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
