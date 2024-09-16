import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify'

import { login } from '../service/authService';
import { handleOnchangeInputs } from '../utils';
import { StoreContext } from '../store/StoreContext';
import '../style/index.css' 

function Login() {
    const { setUserStore, fetchDataAccount, width } = useContext(StoreContext)
    const navigate = useNavigate()
    const defaultValue = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(defaultValue)

    const handleLogin = async () => {

        if (!user.email || !user.password) {
            toast.error('Vui lòng nhập thông tin!')
            return
        }
        const response = await login(user)

        if (response && +response.data.EC === 0) {
            toast(response.data.EM)
            setUser(defaultValue)
            navigate('/')
            fetchDataAccount()
            setUserStore(response.data.DT)
        } else {
            toast.error(response.data.EM)
        }
    }

    return (
        <div className='container d-flex align-items-center justify-content-center min-vh-100'>
            <div className={`shadow ${width < 467 ? 'w-100' : 'w-50'} p-3 mb-5 bg-body rounded`}>
                <h3 className='text-center mb-3'>Đăng nhập</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        onChange={(e) =>
                            handleOnchangeInputs(setUser, user, e.target.value, 'email')}
                        value={user.email}
                        type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        onChange={(e) =>
                            handleOnchangeInputs(setUser, user, e.target.value, 'password')}
                        value={user.password}
                        type="password" className="form-control" id="password" placeholder='Mật khẩu' />
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

