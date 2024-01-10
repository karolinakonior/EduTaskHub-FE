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
import { Subject } from "../types/Subject";

export default function SubjectForm({setStudentSubjects, studentSubjects}: {setStudentSubjects: React.Dispatch<React.SetStateAction<any>>, studentSubjects: any}) {
    const { user, setUser } = useContext<any>(UserContext);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        getSubjects().then((subjects: Subject[]) => {
          for (let i = 0; i < studentSubjects.length; i++) {
            for (let j = 0; j < subjects.length; j++) {
              if (studentSubjects[i].subject_id === subjects[j].subject_id) {
                subjects.splice(j, 1)
              }
            }
          }
            setSubjects(subjects);
        })
      }, [studentSubjects]);
    
    const handleChange = (event: SelectChangeEvent) => {
        return postStudentSubject(user.student_id, event.target.value.toString())
        .then((subject: Subject) => {
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
          value=""
          label="Subject"
          onChange={handleChange}
        >
            {subjects.map((singleSubject: Subject) => {
                return (
                    <MenuItem value={singleSubject.subject_name}>{singleSubject.subject_name}</MenuItem>
                )
            })}
        </Select>
      </FormControl>
    </Box>
  );
}