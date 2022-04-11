import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, Checkbox } from "@material-ui/core";

export default function ActivateDoctor() {
  useEffect(() => {
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

    fetchDoctors();
  }, []);
  var i = 0;

  const [inactiveDocs, setInactiveDocs] = useState([]);
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

  const submitActivation = () => {
    try {
      for (i = 0; i < checked.length; i++) {
        console.log(
          "looping assignment" + checked[i] + "to this doc: " + selectDoc
        );
        setMessage("Assigned patient " + checked + " to doctor " + selectDoc);

        axios.post(
          "https://tranquil-wildwood-60713.herokuapp.com/api/doctor/changeDoctorActiveStatus",
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

  const isActiveBitches = (props) => {};
  const [Message, setMessage] = useState();
  return (
    <div className="userList">
      <div className="userHeader">Activate Doctor Accounts</div>

      {/* lastname={data.map(datas => <div>{JSON.stringify(datas)}</div>)} */}
      <div className="assignment" style={{ display: "flex" }}>
        <div
          className="doctorSide"
          style={{ width: "100%", border: "1px solid black" }}
        >
          {doctors.map((values) => {
            console.log(values);

            return (
              <div className="userCard">
                <Checkbox
                  onChange={handleToggle(values.accountID)}
                  checked={checked.indexOf(values.accountID) !== -1}
                />
                <span className="userDetails">
                  <span>
                    {values.lastName}, {values.firstName}
                  </span>
                </span>
                {/* onclick=cookies.set() */}
                {/* //value={value.accountID} */}
              </div>
            );
          })}
        </div>
      </div>
      <h2>{Message}</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={submitActivation} style={{ fontSize: "24px" }}>
          ACTIVATE DOCTOR
        </button>
      </div>
    </div>
  );
}
