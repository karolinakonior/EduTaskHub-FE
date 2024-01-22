import { useContext } from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { UserContext } from "../context/UserContext";
import formattedDate from "../utils/date_format";
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import SubmissionCard from "./pages/SubmissionCard";

export default function Submissions({ submissions, setSubmissions} : {submissions: any, setSubmissions: React.Dispatch<React.SetStateAction<any>>}) {
    const { user } = useContext<any>(UserContext);

    return (
      <>
        {submissions.length === 0 ? (
          <Typography variant="h6" component="div" gutterBottom>
            You have no submissions yet.
          </Typography>
        ) : (
          <>
            {submissions.map((submission: any) => (
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
                    {submission.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {submission.subject_name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={
                      {
                        pathname: `/submissions/${submission.submission_id}`,
                        state: { submission: submission },
                      } as any
                    }
                  >
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
            <Routes>
              <Route
                path="/submissions/:submission_id"
                element={<SubmissionCard />}
              />
            </Routes>
          </>
        )}
      </>
    );
}
