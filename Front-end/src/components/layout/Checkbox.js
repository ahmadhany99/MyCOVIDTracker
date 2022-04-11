import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import classes from "./Checkbox.module.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function CheckboxListSecondary() {
  const [Covid, setCovid] = useState(0);
  const submitStatus = async () => {
    Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/status/update",
      {
        patientID: Cookies.get("patientID"),
        report: checked,
      }
    )
      .then((response) => {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((error) => {
        console.error(error.response);
      });
    Axios.put(
      "https://tranquil-wildwood-60713.herokuapp.com/api/patient/update/covid",
      {
        patientID: Cookies.get("patientID"),
        covidStatus: Covid,
      }
    )
      .then((response) => {
        // setTimeout(() => {
        //   navigate("/profile");
        // }, 2000);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const navigate = useNavigate();
  const [checked, setChecked] = React.useState([]);
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

  // if (checked.includes("Fever")) {
  //   setCovid(true);
  // }
  const statusArray = [
    {
      question: "Do you have covid?",
      answer: "Has Covid",
    },
    {
      question: "Do you have a fever?",
      answer: "Fever",
    },
    {
      question: "Do you have a headache?",
      answer: "Headache",
    },
    {
      question: "Are you having dry coughs?",
      answer: "Dry coughs",
    },
    {
      question: "Experiencing fatigue?",
      answer: "Fatigue",
    },
    {
      question: "Loss of taste/smell?",
      answer: "Loss of taste/smell",
    },
    {
      question: "Have a sore throat?",
      answer: "Sore throat",
    },
  ];
  return (
    <section>
      <List dense sx={{ width: "100%" }}>
        {statusArray.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;

          return (
            <ListItem
              key={value.question}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.answer)}
                  checked={checked.indexOf(value.answer) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
              className={classes.question}
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={`${value.question}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Link to="/dashboard">
        <div className={classes.submit} position="up" onClick={submitStatus}>
          Confirm
        </div>
      </Link>
      <div>{checkedItems}</div>
      {useEffect(() => {
        if (checked.includes("Has Covid")) {
          setCovid(1);
          console.log("+");
        } else {
          setCovid(0);
          console.log("-");
        }
      })}
    </section>
  );
}
