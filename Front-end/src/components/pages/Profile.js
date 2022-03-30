import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import { Box } from "@mui/system";
import classes from "./Profile.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StatusLog from "../layout/StatusLog";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const patientInfo = {
  name: "Victoria Robertson",
  doctor: "Dr. Hamilton",
};

const logout = () => {
  Cookies.remove("email");
  Cookies.remove("accountID");
  Cookies.remove("lastName");
  Cookies.remove("firstName");
};

const firstname = Cookies.get("firstName");
const lastname = Cookies.get("lastName");

function Profile() {
  return (
    <Box>
      <div className={classes.profileHeader}>
        <h2 className={classes.title}>Profile</h2>
        <Link to="/">
          <Button onClick={logout}>Logout</Button>
        </Link>
      </div>
      <div className={classes.patient_info}>
        <h2>
          {firstname} {lastname}
        </h2>
        <p>Assigned to {patientInfo.doctor}</p>
      </div>
      <div className={classes.statusHeader}>
        <h2>Status Backlog</h2>
        <Link to="/status">
          <Button>Add Status</Button>
        </Link>
      </div>
      <StatusLog />
      <SimpleBottomNavigation />
    </Box>
  );
}

export default Profile;
