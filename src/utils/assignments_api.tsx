import axios from "axios";


const assignmentsAPI = axios.create({
    baseURL: "https://edutaskhub.onrender.com/api/assignments"
})

export const getAssignments = () => {
    return assignmentsAPI.get(`/`).then((response) => {
        return response.data.assignments;
    })
}