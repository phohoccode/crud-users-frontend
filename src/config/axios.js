import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://phosocial-backend.vercel.app/'
});

instance.defaults.withCredentials = true

export default instance