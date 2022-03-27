import Head from "next/head";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import * as Axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Container,
  Grid,
  responsiveFontSizes,
  TextField,
  Typography,
} from "@mui/material";

const fetchPosts = async () => {
  try {
    const response = await Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/account/getAccount",
      {
        email: Cookies.get("email"),
      }
    );
    console.log(response);
    //const data = response.data[0];
   // console.log("getting data from response: " + response.data.result[0].firstName);
    Cookies.set("accountID", response.data.result[0].accountID);
    Cookies.set("lastName", response.data.result[0].lastName);
    Cookies.set("firstName", response.data.result[0].firstName);
  } catch (err) {
    console.log(err.response);
  }
};
function Login() {
  const loginUser = () => {
    Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/account/login",
      {
        email: emailLog,
        password: passwordLog,
      }
    )
      .then((response) => {
        console.log(response);
        Cookies.set("email", emailLog);
        fetchPosts();
        setTimeout(() => {
          console.log("this better work!");
          navigate("/dashboard");
        }, 300);
      })
      .catch((error) => {
        console.error(error.response);
        setError(error.response.data.message);
        console.log("Error: " + emailLog + " " + passwordLog);
      });
  };

  const [emailLog, setEmail] = useState("");
  const [passwordLog, setPassword] = useState("");
  const [ErrorLog, setError] = useState("");
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      navigate("/dashboard");
    },
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
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
                Log in
              </Typography>
            </Box>
            <TextField
              //error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              //helperText={formik.touched.username && formik.errors.username}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={emailLog}
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
                setPassword(e.target.value);
              }}
              type="password"
              value={passwordLog}
              variant="outlined"
            />
            <h5 style={{ color: "red" }}>{ErrorLog}</h5>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={loginUser}
              >
                Log In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <Link to="/account/createAccount">Sign Up</Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Login;
