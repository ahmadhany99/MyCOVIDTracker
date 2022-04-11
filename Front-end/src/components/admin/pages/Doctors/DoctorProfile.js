import { Box } from "@mui/system";
import classes from "../../../pages/Profile.module.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import StatusLog from "../../../layout/StatusLog";
import Status from "../StatusList/Status";

function DoctorProfile() {
  let navigate = useNavigate();
  const logout = () => () => {
    Cookies.remove("email");
    Cookies.remove("patientID");
    Cookies.remove("patientLastName");
    Cookies.remove("patientFirstName");
    navigate("/");
  };
  const leavePatient = () => () => {
    Cookies.remove("patientID");
    Cookies.remove("patientLastName");
    Cookies.remove("patientFirstName");
    navigate("/admin/doctors");
  };
  useEffect(() => {
    const isAdmin = () => {
      console.log("look here!");
      if (Cookies.get("accountID") !== null) {
        setAdmin(true);
        console.log("am i an admin?" + admin);
      } else {
        setAdmin(false);
        console.log("am i an admin?" + admin);
      }
    };
    isAdmin();
  }, []);

  const firstname = Cookies.get("doctorFirstName");
  const lastname = Cookies.get("doctorLastName");
  const [admin, setAdmin] = useState();

  return (
    <Box>
      <div className={classes.profileHeader}>
        <h2 className={classes.title}>Profile</h2>

        <span>
          {admin ? (
            <Button onClick={leavePatient()}>Back</Button>
          ) : (
            <Button onClick={logout()}>Logout</Button>
          )}
        </span>
      </div>
      <div className={classes.patient_info}>
        <h2>
          Dr. {firstname} {lastname}
        </h2>
      </div>
      <div className={classes.statusHeader}>
        <h2>Patient Status Backlog</h2>
      </div>
      <Status />
    </Box>
  );
}

export default DoctorProfile;
