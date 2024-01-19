import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useContext } from 'react';
import { postStudentSubmission } from '../utils/users_api';
import { UserContext } from '../context/UserContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const defaultTheme = createTheme();

export default function SubmitAssignment({ assignment_id} : any) {
  const [submission, setSubmission] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { user, setUser } = useContext<any>(UserContext);

  const handleSubmission = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    postStudentSubmission(user.student_id, assignment_id, submission)
      .then((studentSubmission) => {
        if (studentSubmission.submission_id) {
          setIsFormSubmitted(true);
        }
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {isFormSubmitted ? (
        <div>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1.75,
              minWidth: 275,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            <Typography>Assignment submitted successfully!</Typography>
          </Box>
        </div>
      ) : (
        <form onSubmit={handleSubmission}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="submission"
              name="submission"
              required
              id="submission"
              label="Submission"
              autoFocus
              sx={{ m: 2, minWidth: 275, mr: 7, width: "80%" }}
              minRows={15}
              multiline={true}
              size="medium"
              value={submission}
              onChange={(e) => {
                setSubmission(e.target.value);
              }}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 2, mt: 1, maxWidth: 200 }}
          >
            Submit
          </Button>
        </form>
      )}
    </ThemeProvider>
  );
}
