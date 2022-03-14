import classes from "./Banner.module.css";
import { Box } from "@mui/system";

function Banner() {
  return (
    <Box>
        <br/><br/><br/><br/>
      <div className={classes.banner}>myCOVIDtracker</div>
    </Box>
  );
}

export default Banner;
