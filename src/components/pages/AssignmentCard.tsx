import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleAssignment } from '../../utils/assignments_api'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { getSubjects } from '../../utils/subjects_api';
import Loader from '../Loader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SubmitAssignment from '../SubmitAssignment';

const defaultTheme = createTheme();

export default function AssignmentCard(props: any) {
    const { assignment_id } = useParams()
    const [assignment, setAssignment] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<any>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        getSingleAssignment(assignment_id).then((assignment: any) => {
            setAssignment(assignment)
        })
        .then(() => {
            getSubjects().then((receivedSubjects: any) => {
                setSubjects(receivedSubjects);
                setLoading(false)
            })
        })

    }, [])

    const handleClick = () => {
      setIsSubmitting(true)
    }

    const getSubjectName = (subject_id: number) => {
        for (let i = 0; i < subjects.length; i++) {
          if (subjects[i].subject_id === subject_id) {
            return subjects[i].subject_name;
          }
        }
      }

    if(loading) return (<div><Loader /></div>)

    return (
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Card sx={{ minWidth: 275, m: 2, mt: 4 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Due {assignment.due_date.split("T")[0]}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                {assignment.name}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {getSubjectName(assignment.subject_id)}
              </Typography>
              <Divider />
              <Typography
                variant="h6"
                component="div"
                sx={{ mt: 2 }}
                gutterBottom
              >
                {assignment.description}
              </Typography>
            </CardContent>
            {!isSubmitting ? (
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2, maxWidth: 200 }}
                  onClick={handleClick}
                >
                  Submit assignment
                </Button>
              </CardActions>
            ) : null}
          </Card>
          {isSubmitting && <SubmitAssignment assignment_id={assignment_id} />}
        </div>
      </ThemeProvider>
    );
}