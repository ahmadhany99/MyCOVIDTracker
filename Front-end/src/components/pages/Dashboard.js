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
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("yooooo");
        const response = await Axios.post(
          "http://localhost:1337/api/account/getAccount",
          {
            username: Cookies.get("username"),
          }
        );
        console.log(response.data[0]);
        setData(response.data);
        console.log("accountID" + data[0]);
        Cookies.set("accountID", response.data[0].accountID);
        Cookies.set("lastName", response.data[0].lastName);
        Cookies.set("firstName", response.data[0].firstName);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchPosts();
  }, []);

  const [data, setData] = useState();

  return (
    <section className={classes.dashboard}>
      <h2 className={classes.hello}>Hello, {Cookies.get("firstName")}</h2>
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
