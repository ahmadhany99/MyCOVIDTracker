import { Box } from "@mui/system";
import classes from "../../../pages/Profile.module.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import StatusLog from "../../../layout/StatusLog";
import Status from "../StatusList/Status";
import axios from "axios";

function DoctorProfile() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        //console.log(response.data.result);
        setPatients(response.data.result);
      } catch (err) {
        console.log(err.response);
      }
    };
    const fetchPriority = async (props) => {
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/get/flag",
          {
            patientID: props,
          }
        );
        //console.log(response.data);
        setPriority(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    const numberOfPatients = async () => {
      try {
        const response = await axios.post(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/getDoctorsNumberOfPatients",
          {
            doctorID: Cookies.get("accountID"),
          }
        );
        console.log("hello" + response);
        setNbrOfPatients(response);
        setBannerStatus("Patients");
      } catch (error) {
        console.log(error);
        setNbrOfPatients(0);
        setBannerStatus("You have no patients!");
        //console.log(nbrOfPatients);
      }
    };
    numberOfPatients();
    fetchPriority();
    fetchPosts();
  }, []);
  const [patients, setPatients] = useState([]);
  const [priority, setPriority] = useState([]);
  const [nbrOfPatients, setNbrOfPatients] = useState();
  const [bannerStatus, setBannerStatus] = useState();

  console.log(patients);
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
        <h2>Patients</h2>
      </div>
    </Box>
  );
}

export default DoctorProfile;
