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
import SignUpPage from "./page/SignUpPage";

import { Layout } from "antd";
import ManageUsersPage from "./page/ManageUsersPage";
import EditUserPage from "./page/EditUserPage";
import EditPasswordPage from "./page/EditPassword";
const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter basename={'/bloodminor-search'}>
      <AuthProvider>
        <Layout>
          {/* Navbar */}
          <Navbar />

          {/* Content */}
          <Content
            style={{
              padding: "0 50px",
              marginTop: 24,
              minHeight: "calc(100vh - 64px - 70px)",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              {true? (
                <>
                  <Route
                    path="/manage-user"
                    element={
                      <ProtectedRoute>
                        <ManageUsersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/edit-profile/:userId" element={<EditUserPage />} />
                  <Route path="/edit-password/:userId" element={<EditPasswordPage />} />
                </>
              ) : null}

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
                    <ManageBannerPage />
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
          </Content>

          {/* Footer */}
          <FooterComponents />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
