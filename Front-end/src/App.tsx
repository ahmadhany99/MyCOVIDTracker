import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/Landing.js";
import SignUpPage from "./components/pages/SignUp.js";
import LoginPage from "./components/pages/Login.js";
import DashboardPage from "./components/pages/Dashboard.js";
import ProfilePage from "./components/pages/Profile.js";
import MessagePage from "./components/pages/Messages.js";
import StatusPage from "./components/pages/Status.js";
import CalendarPage from "./components/pages/Calendar.js";
import Layout from "./components/layout/Layout.js";
import Banner from "./components/layout/Banner";
import PrivateRoute from "./components/pages/PrivateRoute.js";

import AdminSignUp from "./components/admin/pages/AdminSignUp.js";
import AdminLogin from "./components/admin/pages/AdminLogin.js";
import Home from "./components/admin/pages/home/Home.jsx";
import Sidebar from './components/admin/components/sidebar/Sidebar.jsx';
import AdminLanding from "./components/admin/pages/AdminLanding.js";
import AdminPrivateRoute from "./components/admin/pages/AdminPrivateRoute.js";

function App() {
  //domain:'/'  localhost:3000/
  //after dev: my-page.com/
  return (
    <div>
      <Layout>
        <Banner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account/createAccount" element={<SignUpPage />} />
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLanding />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <Home />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <MessagePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/status"
            element={
              <PrivateRoute>
                <StatusPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
