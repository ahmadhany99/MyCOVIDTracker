import "../../admin/pages/patientList/userList.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Cookies from "js-cookie";
import { id } from "date-fns/locale";
import { Button, Checkbox } from "@material-ui/core";
import { set } from "date-fns";

export default function AllPatients() {
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        console.log("patients" + response.data);
        setPatients(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatients();
  }, []);
  const [patients, setPatients] = useState([]);
  const [flaggedPatients, setFlaggedPatients] = useState([]);

  const toggleFlag = (event) => () => {
    try {
      console.log("flaggingggg " + event);
      const response = axios
        .put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/patient/set/flag",
          {
            patientID: event,
          }
        )
        .then((response) => {
          console.log(response);
          setflagmessage(response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();

  const [Flagmessage, setflagmessage] = useState();
  const gotoProfile = (id, fname, lname) => () => {
    Cookies.set("patientID", id);
    Cookies.set("patientFirstName", fname);
    Cookies.set("patientLastName", lname);
    //console.log(patients);
    //console.log(Cookies.get("patientID"));
    setTimeout(navigate("/profile"), 5000);
  };

  return (
    <div className="userList">
      <div className="userHeader">All Patients</div>
      {patients.map((values) => {
        return (
          <div className="userCard">
            <AccountCircleRoundedIcon fontSize="large" />

            <span className="userDetails<">
              <p
                className="patientLink"
                onClick={gotoProfile(
                  values.patientID,
                  values.firstName,
                  values.lastName
                )}
              >
                {values.lastName}, {values.firstName}
              </p>
            </span>
            <Checkbox onChange={toggleFlag(values.patientID)} />
          </div>
        );
      })}
      <h2>{Flagmessage}</h2>
    </div>
  );
}
