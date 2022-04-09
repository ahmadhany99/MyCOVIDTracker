import { Button } from "@mui/material";
import { Box } from "@mui/system";
import QuarantineClock from "../layout/QuarantineClock";
import SimpleBottomNavigation from "../layout/SimpleBottomNavigation";
import classes from "./Dashboard.module.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import * as Axios from "axios";

const username = Cookies.get("username");
console.log(username);

function DashboardPage(response) {
  return (
    <section className={classes.dashboard}>
      <h2 className={classes.hello}>
        Hello, {Cookies.get("patientFirstName")}
      </h2>
      <div className={classes.status_box}>
        <h2>
          Have you updated
          <br />
          your status today?
        </h2>
        <Button
          variant="contained"
          className={classes.status_cta}
          href="/status"
        >
          Update Status
        </Button>
      </div>
      <h2 className={classes.self_q}>Self-quarantining</h2>
      <QuarantineClock />
      <SimpleBottomNavigation />
    </section>
  );
}

export default DashboardPage;
