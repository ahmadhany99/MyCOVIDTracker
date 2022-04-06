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
import { useState } from "react";
import Cookies from "js-cookie";

export default function CheckboxListSecondary() {
  const submitStatus = () => {
    Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/status/update",
      {
        patientID: Cookies.get("accountID"),
        report: checked,
      }
    )
      .then((response) => {
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
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
      <Link to="/profile">
        <div className={classes.submit} position="up" onClick={submitStatus}>
          Confirm
        </div>
      </Link>
      <div>{checkedItems}</div>
    </section>
  );
}
