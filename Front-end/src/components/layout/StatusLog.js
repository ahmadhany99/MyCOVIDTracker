
import { Box } from "@mui/system";
import classes from "./StatusLog.module.css";

const statusLogArr = [
  {
    covid: "+",
    date: "14/02/2022",
    temperature: "38.5",
    symptom1: "fatigue",
    symptom2: "dry coughs",
    symptom3: "high fever",
    symptom4: "",
  },
  {
    covid: "+",
    date: "14/02/2022",
    temperature: "38.5",
    symptom1: "fatigue",
    symptom2: "dry coughs",
    symptom3: "high fever",
    symptom4: "headache",
  },
  {
    covid: "+",
    date: "14/02/2022",
    temperature: "38.5",
    symptom1: "fatigue",
    symptom2: "dry coughs",
    symptom3: "high fever",
    symptom4: "headache",
  },
  {
    covid: "+",
    date: "14/02/2022",
    temperature: "38.5",
    symptom1: "fatigue",
    symptom2: "dry coughs",
    symptom3: "high fever",
    symptom4: "headache",
  },
  {
    covid: "-",
    date: "14/02/2022",
    temperature: "38.5",
    symptom1: "fatigue",
    symptom2: "dry coughs",
    symptom3: "high fever",
    symptom4: "headache",
  },
];

function StatusLog() {
  return (
    <Box>
      {statusLogArr.map((value) => {
        return (
          <div className={classes.box}>
            <div className={classes.status}>+</div>
            <div className={classes.right}>
              <p className={classes.date}>{value.date}</p>
              <span>{value.temperature}&#176;C, </span>
              <span>{value.symptom1}, </span>
              <span>{value.symptom2}, </span>
              <span>{value.symptom3}, </span>
              <span>{value.symptom4} </span>
            </div>
            <br/>
          </div>
        );
      })}
      <br/>
      <br/>
      <br/>
    </Box>
  );
}

export default StatusLog;
