import landing from "../images/landing.png";
import classes from "./Landing.module.css";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={landing} />
      <h1>
        Keep Track of <br /> Yourself
      </h1>
      <p>
        Keeping track of your status made <br /> easier with myCOVIDtracker
      </p>
      <Link to="/signup">
        <Button variant="contained"className={classes.start_cta}>
          Get Started
        </Button>
      </Link>
    </Box>
  );
}

export default Landing;
