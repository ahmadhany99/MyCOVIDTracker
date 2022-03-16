import classes from "./Calendar.module.css";
import { Box } from "@mui/system";
import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import { DatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { Calendar as Cal } from "react-calendar";
import Appointment from "../layout/Appointment";

const appointmentArr = [];

function Calendar() {
  return (
    <Box>
      <h2 className={classes.title}>Calendar</h2>
      <Cal/>
      <p className={classes.sub_title}>Upcoming appointments</p>
      <Appointment/>
      <SimpleBottomNavigation />
    </Box>
  );
}

export default Calendar;
