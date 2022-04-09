import { DeleteOutline } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, Checkbox } from "@material-ui/core";

export default function Assigning() {
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/account/get/patient"
        );
        console.log(response.data.result[0].accountID);
        setPatients(response.data.result);
      } catch (err) {
        console.log(err.response);
      }
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/getalldoctors"
        );
        console.log(response.data.result);
        setDoctors(response.data.result);
      } catch (err) {
        console.log(err.response);
      }
    };

    console.log("this are your doctors: " + doctors);
    console.log("this are your patients: " + patients);
    fetchPatients();
    fetchDoctors();
  }, []);
  var i = 0;

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [checked, setChecked] = useState([]);
  const handleToggle = (event) => () => {
    const currentIndex = checked.indexOf(event);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(event);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  var checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  const [selectDoc, setSelectDoc] = useState();
  const handleDoctorToggle = (event) => () => {
    setSelectDoc(event);
  };

  const submitAssignment = () => {
    try {
      for (i = 0; i < checked.length; i++) {
        console.log(
          "looping assignment" + checked[i] + "to this doc: " + selectDoc
        );
        axios.post(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/assignDoctorToPatient",
          {
            doctorID: selectDoc,
            patientID: checked[i],
          }
        );
        console.log("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userList">
      <div className="userHeader">
        <p>hello: {checkedItems} :bye</p>
        <p>
          <br />
          Dr.{selectDoc}
        </p>
      </div>

      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      {patients.map((values) => {
        return (
          <div className="userCard">
            <Checkbox
              onChange={handleToggle(values.accountID)}
              checked={checked.indexOf(values.accountID) !== -1}
            />
            <span className="userDetails">
              <Link to="/">
                <span>
                  {values.accountID} : {values.lastName}, {values.firstName}
                </span>
              </Link>
            </span>
            {/* onclick=cookies.set() */}
            {/* //value={value.accountID} */}
          </div>
        );
      })}
      {doctors.map((values) => {
        return (
          <div className="userCard">
            <input
              type="radio"
              value={values.accountID}
              name="doctor"
              onChange={handleDoctorToggle(values.accountID)}
            />
            <span className="userDetails">
              <Link to="/">
                <span>
                  {values.accountID} : {values.lastName}, {values.firstName}
                </span>
              </Link>
            </span>
            {/* onclick=cookies.set() */}
            {/* //value={value.accountID} */}
          </div>
        );
      })}
      <Button onClick={submitAssignment}>ASSIGN DOCTOR TO PATIENTS</Button>
    </div>
  );
}
