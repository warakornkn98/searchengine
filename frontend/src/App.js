import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SearchAdminPage from "./page/SearchAdminPage";
import SearchPage from "./page/SearchPage";
import Navbar from "./component/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import ResultPage from "./page/ResultPage";
import AddBloodInfoPage from "./page/AddBloodInfoPage";
import HomePage from "./page/HomePage";
import ProfilePage from "./page/ProfilePage";
import PrintPage from "./page/PrintPage";
import FooterComponents from "./component/Footer";
import ManageBannerPage from "./page/ManageBannerPage";

const user = "a";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/print" element={<PrintPage />} />
          <Route
            path="/admin/search"
            element={
              <ProtectedRoute>
                <SearchAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banner"
            element={
              <ProtectedRoute>
                <ManageBannerPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route
            path="/admin/addbloodinfo"
            element={
              <ProtectedRoute>
                <AddBloodInfoPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <FooterComponents/> */}
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
