import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Assignment } from '../types/Assignment';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AssignmentCard from './pages/AssignmentCard';
import { getSubjects } from "../utils/subjects_api";
import formattedDate from "../utils/date_format";
import Loader from './Loader';

export default function Assignments ({studentAssignments, setStudentAssignments, submissions, setSubmissions}: {studentAssignments: any,setStudentAssignments: React.Dispatch<React.SetStateAction<any>>, submissions: any, setSubmissions: React.Dispatch<React.SetStateAction<any>>}) {
  const [subjects, setSubjects] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSubjects().then((receivedSubjects: any) => {
      setSubjects(receivedSubjects);
      setLoading(false);
    });
  }, []);

  const getSubjectName = (subject_id: number) => {
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].subject_id === subject_id) {
        return subjects[i].subject_name;
      }
    }
  }

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
    <>
      {studentAssignments.length === 0 ? (
        <Typography variant="h6" component="div" gutterBottom>
          You have no assignments yet.
        </Typography>
      ) : (
        <>
          {studentAssignments.map((singleAssignment: Assignment) => {
            return (
              <>
                <Card sx={{ minWidth: 275, mt: 2 }} key={singleAssignment.assignment_id}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Due{" "}
                      {formattedDate(singleAssignment.due_date).split(",")[0]}
                    </Typography>
                    <Typography variant="h5" component="div" gutterBottom>
                      {singleAssignment.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {getSubjectName(singleAssignment.subject_id)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={
                        {
                          pathname: `/assignments/${singleAssignment.assignment_id}`,
                          state: { singleAssignment: singleAssignment },
                        } as any
                      }
                    >
                      <Button size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>

                <Routes>
                  <Route
                    path="/assignments/:assignment_id"
                    element={<AssignmentCard />}
                  />
                </Routes>
              </>
            );
          })}
        </>
      )}
    </>
  );
}