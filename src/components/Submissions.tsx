import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from 'react';
import React from 'react';
import { getStudentSubmissions } from '../utils/users_api';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Submission } from "../types/Submission";

export default function Submissions() {
    const { user, setUser } = useContext<any>(UserContext);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        getStudentSubmissions(user.student_id).then((result) => {
            setSubmissions(result);
        })
      }, []);

    return (
      <>
        {submissions.length === 0 ? (
          <Typography variant="h5" component="div" gutterBottom>
            You have no submissions.
          </Typography>
        ) : null}

        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Due date
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              Name
            </Typography>
            <Typography color="text.secondary">Subject</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </>
    );
}