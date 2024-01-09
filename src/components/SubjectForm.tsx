import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getSubjects } from "../utils/subjects_api";
import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from 'react';
import { postStudentSubject } from '../utils/users_api';
import React from 'react';

export default function SubjectForm({setStudentSubjects, studentSubjects}: {setStudentSubjects: React.Dispatch<React.SetStateAction<any>>, studentSubjects: any}) {
    const { user, setUser } = useContext<any>(UserContext);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getSubjects().then((subjects: any) => {
            setSubjects(subjects);
        })
      }, []);
    
    const handleChange = (event: SelectChangeEvent) => {
        return postStudentSubject(user.student_id, event.target.value.toString())
        .then((subject: any) => {
            setStudentSubjects([...studentSubjects, {subject_id: subject.subject_id, subject_name: event.target.value }])
        })
    };

    return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-subject-dropdown">Subject</InputLabel>
        <Select
          labelId="select-subject-dropdown"
          id="select-subject-dropdown"
          value={subjects.toString()}
          label="Subject"
          onChange={handleChange}
        >
            {subjects.map((singleSubject: any) => {
                return (
                    <MenuItem value={singleSubject.subject_name}>{singleSubject.subject_name}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
    </Box>
  );
}