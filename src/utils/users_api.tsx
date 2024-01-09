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
        console.log(response.data.subjects, "subjects in ap")
        return response.data.subjects;
    })
}