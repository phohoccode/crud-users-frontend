import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://phosocial-backend.vercel.app/' || 'http://localhost:5000/'
});

instance.defaults.withCredentials = true

export default instance