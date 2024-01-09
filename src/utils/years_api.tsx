import axios from "axios";
import { Year } from "../types/Year";

const yearsAPI = axios.create({
    baseURL: "https://edutaskhub.onrender.com/api/years"
})

export const getYears = () => {
    return yearsAPI.get(`/`).then((response) => {
        return response.data.years;
    })
}