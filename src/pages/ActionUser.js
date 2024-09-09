import { useState, useEffect } from 'react'
import _ from 'lodash'
import { createNewUser, updateUser } from '../service/userService'

function ActionUser({ onUserAdded, action, setActionUser, dataUser, defaultUser }) {
    const [user, setUser] = useState(defaultUser)

    useEffect(() => {
        action === 'CREATE' ?
            setUser(defaultUser) :
            setUser(dataUser)
    }, [action])

    const handleCheckInputs = () => {
        if (!user.username || !user.email || !user.address || !user.phonenumber || user.sex === '--- Chọn giới tính ---') {
            return false
        }
        return true
    }

    const handleOnchangeInputs = (value, name) => {
        const _user = _.cloneDeep(user)
        _user[name] = value
        setUser(_user)
    }

    const handleActionsUser = async (type) => {
        const check = handleCheckInputs()
        if (!check) {
            alert('Vui lòng nhập nội dung!')
            return
        }

        const response = type === 'CREATE' ?
            await createNewUser(user) :
            await updateUser(user)

        if (response && response.data && +response.data.EC === 0) {
            onUserAdded()
            setUser(defaultUser)
        }

        type === 'UPDATE' && setActionUser('CREATE')
    }

    return (
        <>
            <div className='mb-3'>
                <label className="form-label">Tên người dùng</label>
                <input
                    value={user.username}
                    onChange={(e) => handleOnchangeInputs(e.target.value, 'username')} type="text" className='form-control' />
            </div>

            <div className='mb-3'>
                <label className="form-label">Email</label>
                <input
                    value={user.email}
                    onChange={(e) => handleOnchangeInputs(e.target.value, 'email')} type="email" className="form-control" />
            </div>

            <div className='mb-3'>
                <label className="form-label">Địa chỉ</label>
                <input
                    value={user.address}
                    onChange={(e) => handleOnchangeInputs(e.target.value, 'address')} type="text" className="form-control" />
            </div>

            <div className='mb-3'>
                <label className="form-label">Số điện thoại</label>
                <input
                    value={user.phonenumber}
                    onChange={(e) => handleOnchangeInputs(e.target.value, 'phonenumber')} type="tel" className="form-control" />
            </div>

            <div className='mb-3'>
                <label className="form-label">Giới tính</label>
                <select
                    value={user.sex}
                    onChange={(e) => handleOnchangeInputs(e.target.value, 'sex')} className="form-select">
                    <option selected>--- Chọn giới tính ---</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                </select>
            </div>

            {action === 'UPDATE' &&
                <button onClick={() => setActionUser('CREATE')} className='btn btn-dark me-3'>Huỷ</button>}
            <button onClick={() => handleActionsUser(action)} className='btn btn-primary'>
                {action === 'CREATE' ? 'Thêm' : 'Lưu'}
            </button>
        </>
    );
}

export default ActionUser;
