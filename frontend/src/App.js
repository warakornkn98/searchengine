import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./component/Login";
import SearchAdminPage from "./component/SearchAdminPage";
import SearchPage from "./component/SearchPage";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import ResultPage from "./component/ResultPage";
import AddBloodInfoPage from "./component/AddBloodInfoPage";

const user = "a";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="public">
            <Route
              path="search"
              element={
                <SearchPage />
              }
            />
            <Route
              path="results"
              element={
                  <ResultPage />
              }
            />
          </Route>
          

          <Route
            path="/admin/search"
            element={
              <ProtectedRoute>
                <SearchAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/results"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/addbloodinfo"
            element={
              <ProtectedRoute>
                <AddBloodInfoPage />
              </ProtectedRoute>
            }
          />
          
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
