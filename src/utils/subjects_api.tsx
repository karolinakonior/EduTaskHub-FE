import axios from "axios";

const subjectsAPI = axios.create({
    baseURL: "https://edutaskhub.onrender.com/api/subjects"
})

export const getSubjects = () => {
    return subjectsAPI.get(`/`).then((response) => {
        return response.data.subjects;
    })
}