import { Box } from "@mui/system";
import classes from "./StatusLog.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function StatusLog() {
  const [userLog, setUserLog] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.put(
          "https://tranquil-wildwood-60713.herokuapp.com/api/status/get/all/user",
          {
            patientID: Cookies.get("patientID"),
          }
        );
        //console.log(response.data.result[0]);
        setUserLog(response.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box>
      {userLog.map((value) => {
        const date = value.date;
        const cutDate = date.substring(0, 10);
        return (
          <div className={classes.box}>
            <div className={classes.right}>
              <p className={classes.date}>{cutDate}</p>
              <span>{value.report}</span>
            </div>
            <br />
          </div>
        );
      })}
      <br />
      <br />
      <br />
    </Box>
  );
}

export default StatusLog;
