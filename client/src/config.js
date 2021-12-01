import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://fakebook2021.herokuapp.com/api"
})