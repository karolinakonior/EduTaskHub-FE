import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from "../../context/UserContext";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Loader from '../Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getStudentSubmission } from '../../utils/users_api';
import formattedDate from '../../utils/date_format';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

export default function SubmissionCard() {
    const { submission_id } = useParams()
    const { user } = useContext<any>(UserContext);
    const [submission, setSubmission] = useState<any>([]);
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        getStudentSubmission(user.student_id, submission_id).then((submission: any) => {
            setSubmission(submission)
        })
    }, [])

    return (
      <div>
        <Card sx={{ minWidth: 275, m: 2, mt: 4 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Submitted at: {formattedDate(submission.submitted_at)}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              {submission.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {submission.subject_name}
            </Typography>
            <Divider />
            <Divider />
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 2 }}
              gutterBottom
            >
              Your solution:
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ mt: 1 }}
              gutterBottom
            >
              {submission.solution}
            </Typography>
          </CardContent>
        </Card>
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
            {feedback ? (
              <p>{feedback}</p>
            ) : (
              <Typography>No feedback was provided yet.</Typography>
            )}
          </Box>
        </div>
      </div>
    );
}