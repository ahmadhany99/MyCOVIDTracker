import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import { Box } from "@mui/system";
import classes from "./Profile.module.css";
import StatusLog from "../layout/StatusLog";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

function Profile() {
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
    navigate("/admin/users");
  };
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    if (Cookies.get("accountID") !== null) {
      window.addEventListener("beforeunload", leavePatient);
      return () => {
        window.removeEventListener("beforeunload", leavePatient);
      };
    }
    const fetchPosts = async () => {
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/getDoctor",
          {
            patientID: Cookies.get("patientID"),
          }
        );
        console.log(response);
        setDoctor(response);
      } catch (err) {
        console.log(err);
      }
    };
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
    fetchPosts();
    isAdmin();
  }, []);

  const firstname = Cookies.get("patientFirstName");
  const lastname = Cookies.get("patientLastName");
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
          {firstname} {lastname}
        </h2>
        <p>Assigned to Dr. {doctor}</p>
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
