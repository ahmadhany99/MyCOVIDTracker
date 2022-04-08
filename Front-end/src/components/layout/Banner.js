import classes from "./Banner.module.css";
import { Box } from "@mui/system";

function Banner() {
  return (
    <Box>
      <div className={classes.banner}>myCOVIDtracker</div>
    </Box>
  );
}

export default Banner;
