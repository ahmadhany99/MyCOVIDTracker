import classes from "./Banner.module.css";
import { Box } from "@mui/system";

function Banner() {
  return (
    <Box>
      <div className={classes.banner} data-testid="header">
        myCOVIDtracker
      </div>
    </Box>
  );
}

export default Banner;
