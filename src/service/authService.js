import axios from "axios";

const register = (data) => {
    return axios.post('http://localhost:5000/api/v1/auth/register', { data })
}

const login = (data) => {
    return axios.post('http://localhost:5000/api/v1/auth/login', { data })
}

export {
    register, login
}