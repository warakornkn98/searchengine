import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./component/Login";
import SearchPage from "./component/SearchPage";
import SearchAdminPage from "./component/SearchAdminPage";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./component/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import ResultPage from "./component/ResultPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminsearch"
            element={
              <ProtectedRoute>
                <SearchAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
