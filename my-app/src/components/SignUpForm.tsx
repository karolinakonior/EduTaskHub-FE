import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from 'react';
import app from "../firebase";
import { Link } from 'react-router-dom';
import { postStudent } from "../utils/users_api"
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Student } from "../types/Student";
import ButtonGroup from '@mui/material/ButtonGroup';

const defaultTheme = createTheme();

export default function SignUpForm() {
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [emailSignUp, setEmailSignUp] = useState("");
    const [firstNameSignUp, setFirstNameSignUp] = useState("");
    const [lastNameSignUp, setLastNameSignUp] = useState("");
    const [accountTypeSignUp, setAccountTypeSignUp] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();
    const { user, setUser } = useContext<any>(UserContext);
    console.log(user, "user")
    const handleSubmit = (event: React.SyntheticEvent) => {

        event.preventDefault();
        const auth = getAuth(app);
 
        createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
        .then(({ user }: any ) => {
            const { uid } = user;
            return postStudent({
                email: emailSignUp,
                first_name: firstNameSignUp,
                last_name: lastNameSignUp,
                student_id: uid,
                account_type: accountTypeSignUp
            })
        })
        .then((student: Student) => {
            setUser(student);
            nav(`/dashboard`);
        })
        .catch((err: Error) => {
            setError("Something went wrong. Please try again.")
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    if (e.target.value.length < 2) {
                      setError("First name must be at least 2 characters long.")
                    } else {
                      setError("")
                    }
                    setFirstNameSignUp(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    if (e.target.value.length < 2) {
                      setError("Last name must be at least 2 characters long.")
                    } else {
                      setError("")
                    }
                    setLastNameSignUp(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value) === false) {
                        setError("Please enter a valid email.")
                    } else {
                        setError("")
                    }
                    setEmailSignUp(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{".MuiButtonGroup-grouped:hover": { 
                  backgroundColor: "#73c2fb",
                  color: "white"
                }}}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => { 
                    if (e.target.value.length < 6) {
                      setError("Password must be at least 6 characters long.")
                    } else {
                      setError("")
                    }
                    setPasswordSignUp(e.target.value)
                }}
                />
                <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons"
                sx={{ mt: 3, mb: 2 }}
                size="large"
                fullWidth
                >
                  <Button sx={{
                    backgroundColor: accountTypeSignUp === "student" ? "#1976d2" : "white",
                    color: accountTypeSignUp === "student" ? "white" : "#1976d2",
                    }} onClick={() => {
                    setAccountTypeSignUp("student")
                  }}>
                    Student</Button>
                  <Button sx={{
                    backgroundColor: accountTypeSignUp === "teacher" ? "#1976d2" : "white",
                    color: accountTypeSignUp === "teacher" ? "white" : "#1976d2"
                    }}
                    onClick={() => {
                    setAccountTypeSignUp("teacher")
                  }}>
                    Teacher</Button>
                </ButtonGroup>

                {error ? <Typography variant="body1" mt={1} style={{ color: "red" }}>{error}</Typography> : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> 
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}