import axios from '../config/axios'

const register = (data) => {
    return axios.post('api/v1/auth/register', { data })
}

const login = (data) => {
    return axios.post('api/v1/auth/login', { data })
}

const logout = () => {
    return axios.get('api/v1/auth/logout')
}

const decodeToken = () => {
    return axios.get('api/v1/auth/decode-token')
}

export {
    register, login, decodeToken, logout
}