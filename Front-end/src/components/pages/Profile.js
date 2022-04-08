import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import { Box } from "@mui/system";
import classes from "./Profile.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StatusLog from "../layout/StatusLog";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const logout = () => {
  Cookies.remove("email");
  Cookies.remove("accountID");
  Cookies.remove("lastName");
  Cookies.remove("firstName");
};

const firstname = Cookies.get("firstName");
const lastname = Cookies.get("lastName");

function Profile() {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/getDoctor",
          {
            patientID: Cookies.get("accountID"),
          }
        );
        console.log(response.data.result);
        setDoctor(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

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
