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