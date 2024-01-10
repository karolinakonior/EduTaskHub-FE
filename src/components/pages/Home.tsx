import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Copyright from '../Copyright';
import Divider from '@mui/material/Divider';

const defaultTheme = createTheme();

export default function Home() {
  
    return (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component="h2" variant="h6" sx={{fontWeight: 'bold'}}>
                    EduTaskHub is an open-source educational platform designed to simplify the process of distributing and marking coursework assignments for students and teachers. This platform aims to improve the efficiency of homework management and enhance collaboration within an educational environment.
                </Typography>
                <Typography component="h3" variant="body1" sx={{ mt: 1, mb: 1 }}>
                  <Divider sx={{ mb: 2 }} />
                    <Typography >
                        Features:
                    </Typography>
                    <List>
                        <ListItem>
                            Coursework Distribution:
                            Teachers can effortlessly create and distribute coursework assignments to students.
                            Assignments can cover various subjects and include detailed instructions.
                        </ListItem>
                        <ListItem>
                            Efficient Marking:
                            Streamlined tools for teachers to review and mark student submissions quickly.
                            Automated feedback options to expedite the marking process.
                        </ListItem>
                        <ListItem>
                            Collaborative Learning:
                            Facilitate collaboration among students through shared assignments and peer reviews.
                            Discussion forums for students to ask questions and seek help from peers.
                        </ListItem>
                        <ListItem>
                            Progress Tracking:
                            Track student progress and completion status for each homework assignment.
                            Generate insights into common challenges faced by students. 
                        </ListItem>
                    </List>  
                </Typography>
                <Copyright />
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
  }