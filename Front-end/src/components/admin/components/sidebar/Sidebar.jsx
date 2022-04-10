import "./sidebar.css";
import {
  PermIdentity,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import MedicationIcon from '@mui/icons-material/Medication';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';

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
                <HomeIcon className="sidebarIcon" />
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
                <PeopleIcon className="sidebarIcon" />
                Patients
              </li>
            </Link>
            <Link to="/admin/status" className="link">
              <li className="sidebarListItem">
                <ReceiptIcon className="sidebarIcon" />
                Status
              </li>
            </Link>
            <Link to="/admin/flagged" className="link">
              <li className="sidebarListItem">
                <PermIdentity ty className="sidebarIcon" />
                Flagged Patients
              </li>
            </Link>
            <Link to="/admin/doctors" className="link">
              <li className="sidebarListItem">
                <MedicationIcon className="sidebarIcon" />
                Doctors
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Assigning Patients</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
             
              <AssignmentIndIcon className="sidebarIcon" />
              <Link to="/admin/assign" className="link">
              Assign
              </Link>
            </li>
           
          </ul>

        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList"></ul>
        </div>
        <Link to="/admin">
          <Button onClick={logout}>  <LogoutIcon className='sidebarIcon'/> Logout</Button>
        </Link>
      </div>
    </div>
  );
}
