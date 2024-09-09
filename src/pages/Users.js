import { useState, useEffect } from 'react'
import { deleteUser, getAllUser } from '../service/userService';


function Users({ refresh, setActionUser, setDataUser}) {
    const [users, setUsers] = useState([])

    const fetchAllUsers = async () => {
        const response = await getAllUser()

        if (response && response.data && +response.data.EC === 0) {
            setUsers(response.data.DT)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [refresh])

    const handleDeleteUser = async (id) => {

        const response = await deleteUser(id)

        if (response && response.data && +response.data.EC === 0) {
            fetchAllUsers()
        }
    }

    const handleUpdateUser = (user) => {
        setActionUser('UPDATE')
        setDataUser(user)
    }

    return (
        <div>
            <h4>Danh sách người dùng</h4>
            <table className='table table-bordered table-hover mt-3'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope='col'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.sex === '1' ? 'Nam' : 'Nữ'}</td>
                            <td>{user.phonenumber}</td>
                            <td>{user.address}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className='btn btn-danger mx-3'>Xoá</button>
                                <button
                                    onClick={() => handleUpdateUser(user)}
                                    className='btn btn-warning'>Chỉnh sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Users;