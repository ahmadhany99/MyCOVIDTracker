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

export default function CheckboxListSecondary() {
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

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const statusArr = [
    "What is your body temperature?",
    "Do you have a fever?",
    "Do you have a headache?",
    "Are you having dry coughs?",
    "Experiencing fatigue?",
    "Loss of taste/smell?",
    "Have a sore throat?",
  ];

  return (
    <section>
      <List dense sx={{ width: "100%" }}>
        {statusArr.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;

          if (value === "What is your body temperature?") {
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <FormControl
                    sx={{ width: "7ch", backgroundColor: "white" }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={values.weight}
                      onChange={handleChange("weight")}
                      endAdornment={
                        <InputAdornment position="end">&#176;C</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                }
                disablePadding
                className={classes.question}
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItemButton>
              </ListItem>
            );
          } else {
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
                className={classes.question}
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
      <Link to="/profile">
        <div className={classes.submit} position="up">
          Confirm
        </div>
      </Link>
    </section>
  );
}
