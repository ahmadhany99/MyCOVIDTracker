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
import Banner from './components/layout/Banner';

function App() {
  //domain:'/'  localhost:3000/
  //after dev: my-page.com/
  return (
    <div>
      <Layout>
        <Banner/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
