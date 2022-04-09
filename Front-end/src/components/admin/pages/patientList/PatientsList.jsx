import "./userList.css";
import { DeleteOutline, PinDropSharp } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import Cookies from "js-cookie";
import ToggleFlagged from "../../components/ToggleFlag";
import { id } from "date-fns/locale";
import { Button, Checkbox } from "@material-ui/core";

export default function UserList() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        console.log(response.data.result);
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
        console.log(response.data);
        setPriority(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    const numberOfPatients = async () => {
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/getDoctorsNumberOfPatients",
          {
            doctorID: Cookies.get("accountID"),
          }
        );
        console.log("hello" + response);
        setNbrOfPatients(response);
      } catch (error) {
        console.log(error);
        setNbrOfPatients(0);
        console.log(nbrOfPatients);
      }
    };
    numberOfPatients();
    fetchPriority();
    fetchPosts();
  }, []);
  const [patients, setPatients] = useState([]);
  const [priority, setPriority] = useState([]);

  const [usertypereg, setusertype] = useState("");

  const toggleFlag = (event) => () => {
    try {
      console.log("flaggingggg " + event);
      const response = axios.put(
        "https://tranquil-wildwood-60713.herokuapp.com/api/patient/set/flag",
        {
          patientID: event,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [nbrOfPatients, setNbrOfPatients] = useState();

  return (
    <div className="userList">
      <div className="userHeader"></div>
      {priority.map((values) => {
        if (values.doctorID === Cookies.get("accountID")) {
          return (
            <div className="userCard">
              <AccountCircleRoundedIcon fontSize="large" />

              <span
                style={{ backgroundColor: "orange" }}
                className="userDetails"
              >
                <Link to="/">
                  <span>
                    {values.patientID} : {values.lastName}, {values.firstName}
                  </span>
                </Link>
              </span>
              <Checkbox onChange={toggleFlag(values.accountID)} />
            </div>
          );
        }
        if (nbrOfPatients === 0) {
          return <div>You have no patients!</div>;
        }
      })}
    </div>
  );
}
