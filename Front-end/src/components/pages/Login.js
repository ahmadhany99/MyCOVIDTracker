import Head from "next/head";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import * as Axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  // const h = getAccountByUsernameAndPassword('','');

  const handleSubmit = async (e) => {
    try {
      const response = await Axios.post(
        "http://localhost:1337/api/account/login",
        {
          username: username,
          password: password,
        }
      ).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);

        } else {
          setLoginStatus(response.data[0]);
        }
      });
    } catch (err) {
      console.log(err.data);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

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
      handleSubmit();
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
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="username"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Login;
