import axios from "axios"
// import 'dotenv/config'

const getAllUser = () => {
    return axios.get(`http://localhost:8888/api/v1/read`)
}

const createNewUser = (data) => {
    return axios.post(`http://localhost:8888/api/v1/create`, { data })
}

const deleteUser = (id) => {
    return axios.delete(`http://localhost:8888/api/v1/delete/${id}`)
}

const updateUser = (data) => {
    return axios.put(`http://localhost:8888/api/v1/update`, { data })
}

export {
    getAllUser, createNewUser, deleteUser, updateUser
}