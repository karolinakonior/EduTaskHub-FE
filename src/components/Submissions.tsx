import { useEffect, useContext, useState } from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { UserContext } from "../context/UserContext";
import { getStudentSubmissions } from '../utils/users_api';
import { Submission } from "../types/Submission";
import formattedDate from "../utils/date_format";

export default function Submissions() {
    const { user } = useContext<any>(UserContext);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        getStudentSubmissions(user.student_id).then((result) => {
            setSubmissions(result);
        });
    }, []);

    return (
      <>
        {submissions.length === 0 ? (
          <Typography variant="h6" component="div" gutterBottom>
            You have no submissions yet.
          </Typography>
        ) : (
          <>
            {submissions.map((submission: Submission) => (
              <Card
                key={submission.submission_id}
                sx={{ minWidth: 275, mt: 2 }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Submitted: {formattedDate(submission.submitted_at)}
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom>
                    Title
                  </Typography>
                  <Typography color="text.secondary">Subject</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </>
        )}
      </>
    );
}
