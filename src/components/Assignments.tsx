import { UserContext } from "../context/UserContext"
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Assignment } from '../types/Assignment';

export default function Assignments ({studentAssignments, setStudentAssignments}: {studentAssignments: any,setStudentAssignments: React.Dispatch<React.SetStateAction<any>>}) {
    const { user, setUser } = useContext<any>(UserContext);

return (
    <>
    {studentAssignments.map((singleAssignment: Assignment) => {
        return (
          <>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Due {singleAssignment.due_date.split("T")[0]}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  {singleAssignment.name}
                </Typography>
                <Typography color="text.secondary">
                  Subject: {singleAssignment.subject_id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </>
        );
    })}
    </>
  );
}