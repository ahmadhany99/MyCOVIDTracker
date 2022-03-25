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

const Register = () => {
  const registerUser = () => {
    Axios.post("http://localhost:1337/api/account/createAccount", {
      username: usernameReg,
      password: passwordReg,
      typeId: 0,
      firstname: firstNameReg,
      lastname: lastNameReg,
      email: emailReg,
    })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error.response);
        setErrorReg(error.response.data);
      });
  };

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [firstNameReg, setfirstNameReg] = useState("");
  const [lastNameReg, setlastNameReg] = useState("");
  const [ErrorReg, setErrorReg] = useState("");

  let navigate = useNavigate();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
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
      username: Yup.string().max(255).required("Username is required"),
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
                Sign Up
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
              //error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              //helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
              value={usernameReg}
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

            <h2 color="primary">{ErrorReg}</h2>
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
              Have an account? <L to="/account/login">Log In</L>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
