import axios from "axios";
import { Student } from "../types/Student"

const studentsAPI = axios.create({
    baseURL: "https://edutaskhub.onrender.com/api/students"
})
export const postStudent = (student : Student) => {
    return studentsAPI.post("/", student).then((response) => {
        return response.data.student;
    })
}

export const getStudent = (student_id : string) => {
    return studentsAPI.get(`/${student_id}`).then((response) => {
        return response.data.student;
    })
}

export const postStudentYear = (student_id : string, receivedYear : string) => {
    const year = {
        year: parseInt(receivedYear)
    }
    return studentsAPI.post(`/${student_id}/year`, year).then((response) => {
        return response.data
    })
}

export const getStudentYear = (student_id : string) => {
    return studentsAPI.get(`/${student_id}/year`).then((response) => {
        return response.data.year;
    })
}

export const postStudentSubject = (student_id: string, subject_name: string) => {
    const subject = {
        subject_name: subject_name
    }
    return studentsAPI.post(`/${student_id}/subjects`, subject)
    .then((response) => {
        return response.data.subject;
    }) 
}

export const getStudentSubjects = (student_id: string) => {
    return studentsAPI.get(`/${student_id}/subjects`).then((response) => {
        return response.data.subjects;
    })
}

export const getStudentAssignments = (student_id: string) => {
    return studentsAPI.get(`/${student_id}/assignments`).then((response) => {
        return response.data.assignments;
    })
}

export const getStudentSubmissions = (student_id: string) => {
    return studentsAPI.get(`/${student_id}/submissions`).then((response) => {
        return response.data.submissions;
    })
}

export const postStudentSubmission = (student_id: string, assignment_id: string, solution: string) => {
    const submission = {
        assignment_id: assignment_id,
        solution: solution
    }
    return studentsAPI.post(`/${student_id}/submissions`, submission)
    .then((response) => {
        return response.data.submission;
    }) 
}

export const getStudentSubmission = (student_id: string, submission_id: any) => {
    return studentsAPI.get(`/${student_id}/submissions/${submission_id}`).then((response) => {
        return response.data.submission;
    })
}