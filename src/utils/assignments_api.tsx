import axios from "axios";


const assignmentsAPI = axios.create({
    baseURL: "https://edutaskhub.onrender.com/api/assignments"
})

export const getAssignments = () => {
    return assignmentsAPI.get(`/`).then((response) => {
        return response.data.assignments;
    })
}

export const getSingleAssignment = (assignment_id: any) => {
    return assignmentsAPI.get(`/${assignment_id}`).then((response) => {
        return response.data.assignment;
    })
}