import medicine from "../../images/medicine.png";
import classes from "./AdminLanding.module.css";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AdminLanding() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={medicine} className={classes.bg_photo} />
      <h1> ADMINISTRATION</h1>
      <span className={classes.admin_landing_cta}>
        <Link to="/admin/login">
          <Button variant="contained" className={classes.start_cta}>
            Login
          </Button>
        </Link>
        <Link to="/">
          <Button variant="contained" className={classes.start_cta}>
            Not an administrator?
          </Button>
        </Link>
      </span>
    </Box>
  );
}

export default AdminLanding;
