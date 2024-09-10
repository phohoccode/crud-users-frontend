import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { login } from '../service/authService';

import { toast } from 'react-toastify'

function Login() {
    const navigate = useNavigate()
    const defaultValue = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(defaultValue)

    const handleOnchangeInputs = (value, name) => {
        const _user = _.cloneDeep(user)
        _user[name] = value
        setUser(_user)
    }

    const handleLogin = async () => {

        if (!user.email || !user.password) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }
        const response = await login(user)
        console.log(response)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            setUser(defaultValue)
            navigate('/')
            localStorage.setItem('data-user', JSON.stringify(response.data.DT))
        } else {
            toast.error(response.data.EM)
        }

    }

    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='shadow w-50 p-3 mb-5 bg-body rounded'>
                <h3 className='text-center mb-3'>Login</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        onChange={(e) => handleOnchangeInputs(e.target.value, 'email')}
                        value={user.email}
                        type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        onChange={(e) => handleOnchangeInputs(e.target.value, 'password')}
                        value={user.password}
                        type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div className='my-3 d-flex justify-content-end'>
                    <button onClick={() => handleLogin()} className='btn btn-primary'>Đăng nhập</button>
                </div>
                <div className='text-center'>
                    <span>Chưa có tài khoản? </span>
                    <Link to='/register'>Đăng ký</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;