import { Box } from "@mui/system";
import classes from "./Appointment.module.css";

const appointmentArr = [
  { date: "10/03/2022", time: "10:45AM", details: "Checking dry coughs" },
  { date: "11/03/2022", time: "12:45PM", details: "Checking dry coughs" },
  { date: "12/03/2022", time: "01:45PM", details: "Checking dry coughs" },
  { date: "13/03/2022", time: "02:45PM", details: "Checking dry coughs" },
  { date: "14/03/2022", time: "03:45PM", details: "Checking dry coughs" },
];

function Appointment() {
  return (
    <Box>
      {appointmentArr.map((value) => {
        return (
          <div className={classes.card}>
            <p>
              {value.date} @ {value.time}
            </p>
            <p>{value.details}</p>
          </div>
        );
      })}
      <br/>
      <br/>
    </Box>
  );
}

export default Appointment;
