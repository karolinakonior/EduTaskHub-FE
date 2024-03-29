import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect } from 'react';
import YearForm from '../YearForm';
import { getStudentYear, getStudentSubjects, getStudentAssignments, getStudentSubmissions } from '../../utils/users_api';
import SubjectForm from '../SubjectForm';
import Copyright from '../Copyright';
import Assignments from '../Assignments';
import Submissions from '../Submissions';
import { Subject } from '../../types/Subject';
import Loader from '../Loader';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
    const { user, setUser } = useContext<any>(UserContext);
    const [open, setOpen] = React.useState(true);
    const [year, setYear] = useState(0);
    const [studentSubjects, setStudentSubjects] = useState([]);
    const [studentAssignments, setStudentAssignments] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submissions, setSubmissions] = useState([]);
    const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getStudentYear(user.student_id).then(( singleYear ) => {
      if(singleYear.length === 0) {
        setYear(0)
      } else {
        setYear(singleYear[0].year)
      }
    })
    .then(() => {
      getStudentSubjects(user.student_id).then((subjects) => {
        setStudentSubjects(subjects);
      });
    })
    .then(() => {
      getStudentSubmissions(user.student_id).then((result: any) => {
        setSubmissions(result);
      })
    })
    .then(() => {
      getStudentAssignments(user.student_id).then((assignments: any) => {
        setStudentAssignments(assignments as any);
        setLoading(false);
      })
    })
  }, []);
 
  if(loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
            onClick={toggleDrawer}
          >
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <Typography variant="h3">
                    Welcome back {user.first_name}!
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {year === 0 ? (
                    <YearForm setYear={setYear} year={year} />
                  ) : (
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      You are attending Year {year}.
                    </Typography>
                  )}
                  {studentSubjects.length === 0 ? null : (
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Your subjects:
                    </Typography>
                  )}
                  {studentSubjects.length === 0 ? (
                    <p>
                      You have no subjects yet. Select subjects to get started
                    </p>
                  ) : (
                    <ul>
                      {studentSubjects.map((subject: Subject) => (
                        <li key={subject.subject_id}>{subject.subject_name}</li>
                      ))}
                    </ul>
                  )}

                  <SubjectForm
                    setStudentSubjects={setStudentSubjects}
                    studentSubjects={studentSubjects}
                  />
                </Paper>
                <Paper
                  sx={{ p: 2, display: "grid", flexDirection: "row", mt: 1.5 }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Past submissions:
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Submissions submissions={submissions} setSubmissions={setSubmissions}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Outstanding assignments:
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Assignments
                    studentAssignments={studentAssignments}
                    setStudentAssignments={setStudentAssignments}
                    submissions={submissions}
                    setSubmissions={setSubmissions}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}