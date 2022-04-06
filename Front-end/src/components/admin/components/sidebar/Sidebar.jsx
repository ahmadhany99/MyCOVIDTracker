import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("email");
  Cookies.remove("accountID");
  Cookies.remove("lastName");
  Cookies.remove("firstName");
};

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Patients
              </li>
            </Link>
            <Link to="/admin/status" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Status
              </li>
            </Link>
            <Link to="/admin/flagged" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Flagged Patients
              </li>
            </Link>
            <Link to="/admin/doctors" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Doctors
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList"></ul>
        </div>
        <Link to="/">
          <Button onClick={logout}>Logout</Button>
        </Link>
      </div>
    </div>
  );
}
