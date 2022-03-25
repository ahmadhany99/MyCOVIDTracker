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
    console.log("yooooo");
    const response = await Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/account/getAccount",
      {
        username: Cookies.get("username"),
      }
    );
    console.log(response.data[0]);
    const data = response.data[0];
    console.log("accountID" + data[0]);
    Cookies.set("accountID", data.accountID);
    Cookies.set("lastName", data.lastName);
    Cookies.set("firstName", data.firstName);
  } catch (err) {
    console.log(err.response.data);
  }
};
function Login() {
  const loginUser = () => {
    Axios.post(
      "https://tranquil-wildwood-60713.herokuapp.com/api/account/login",
      {
        username: usernameLog,
        password: passwordLog,
      }
    )
      .then((response) => {
        console.log(response);
        Cookies.set("username", usernameLog);
        fetchPosts();
        setTimeout(() => {
          console.log("this better work!");
          navigate("/dashboard");
        }, 300);
      })
      .catch((error) => {
        console.error(error.response);
        setError(error.response.data.message);
        console.log("Error: " + usernameLog + " " + passwordLog);
      });
  };

  const [usernameLog, setUsername] = useState("");
  const [passwordLog, setPassword] = useState("");
  const [ErrorLog, setError] = useState("");
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
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
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="username"
              value={usernameLog}
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
