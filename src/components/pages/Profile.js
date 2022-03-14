import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import { Box } from "@mui/system";
import classes from "./Profile.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StatusLog from "../layout/StatusLog";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const patientInfo = {
  name: "Victoria Robertson",
  age: "26",
  DOB: "02/12/1994",
  doctor: "Dr. Hamilton",
};

function Profile() {
  return (
    <Box>
      <div className={classes.profileHeader}>
        <h2 className={classes.title}>Profile</h2>
        <span className={classes.profile_pic_box}>
          <AccountCircleOutlinedIcon className={classes.profile_pic} />
        </span>
        <Button>Logout</Button>
      </div>
      <div className={classes.patient_info}>
        <h2>{patientInfo.name}</h2>
        <p>Age: {patientInfo.age} years old</p>
        <p>DOB: {patientInfo.DOB}</p>
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
