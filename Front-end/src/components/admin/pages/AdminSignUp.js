import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as L, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import classes from "./AdminSignUp.module.css";

const AdminSignUp = () => {
  const registerUser = () => {
    Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/account/admin/register",
      {
        password: passwordReg,
        userType: usertypereg, //needs to be changed
        firstname: firstNameReg,
        lastname: lastNameReg,
        email: emailReg,
      }
    )
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.response);
        setError(error.response.data.message);
      });
  };

  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [firstNameReg, setfirstNameReg] = useState("");
  const [lastNameReg, setlastNameReg] = useState("");
  const [ErrorLog, setError] = useState("");
  const [usertypereg, setusertype] = useState("");
  let navigate = useNavigate();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      password2: Yup.string()
        .oneOf([passwordReg, null], "Passwords must match")
        .required("Password is requiired"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      navigate("/dashboard");
    },
  });

  const Defineusertype = (event) => {
    setusertype(event.target.value);
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Admin Sign Up
              </Typography>
            </Box>
            <TextField
              //error={Boolean(
              //  formik.touched.firstName && formik.errors.firstName
              //)}
              fullWidth
              //helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setfirstNameReg(e.target.value);
              }}
              value={firstNameReg}
              variant="outlined"
            />
            <TextField
              //error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              //helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setlastNameReg(e.target.value);
              }}
              value={lastNameReg}
              variant="outlined"
            />
            <TextField
              // error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              //helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
              type="email"
              value={emailReg}
              variant="outlined"
            />
            <FormControl className={classes.professions}>
              <FormLabel id="profession">Profession</FormLabel>
              <RadioGroup
                aria-labelledby="professions"
                defaultValue="1"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Doctor"
                  onChange={Defineusertype}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Health Official"
                  onChange={Defineusertype}
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Immigration Officer"
                  onChange={Defineusertype}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              //error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              //helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              type="password"
              value={passwordReg}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                formik.touched.password2 && formik.errors.password2
              )}
              fullWidth
              helperText={formik.touched.password2 && formik.errors.password2}
              label="Re-enter password"
              margin="normal"
              name="password2"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password2}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <h5 style={{ color: "red" }}>{ErrorLog}</h5>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={registerUser}
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account? <L to="/admin/login">Log In</L>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AdminSignUp;
