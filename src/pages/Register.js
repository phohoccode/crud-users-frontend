import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash'

import { toast } from 'react-toastify';

import { register } from '../service/authService';
import { handleOnchangeInputs } from '../utils';

function Register() {
    const navigate = useNavigate()
    const defaultValue = {
        username: '',
        email: '',
        password: ''
    }
    const [user, setUser] = useState(defaultValue)

    const handleRegister = async () => {
        if (!user.username || !user.email || !user.password) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }

        const response = await register(user)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            setUser(defaultValue)
            navigate('/login')
        } else {
            toast.error(response.data.EM)
        }

    }

    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className='shadow w-50 p-3 mb-5 bg-body rounded'>
                <h3 className='text-center mb-3'>Đăng ký</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Tên người dùng</label>
                    <input
                        value={user.username}
                        onChange={(e) => handleOnchangeInputs(setUser, user, e.target.value, 'username')}
                        type="text" className="form-control" id="username" placeholder="phohoccode" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        value={user.email}
                        onChange={(e) => handleOnchangeInputs(setUser, user, e.target.value, 'email')}
                        type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                        value={user.password}
                        onChange={(e) => handleOnchangeInputs(setUser, user, e.target.value, 'password')}
                        type="password" className="form-control" id="password"/>
                </div>
                <div className='my-3 d-flex justify-content-end'>
                    <button onClick={() => handleRegister()} className='btn btn-primary'>Đăng ký</button>
                </div>
                <div className='text-center'>
                    <span>Đã có tài khoản? </span>
                    <Link to='/login'>Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;