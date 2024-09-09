import { useState, useEffect } from 'react'

import Users from "./Users";
import ActionUser from './ActionUser';

function Home() {
    const defaultUser = {
        username: '',
        email: '',
        address: '',
        phonenumber: '',
        sex: ''
    }
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [actionUser, setActionUser] = useState('CREATE')
    const [dataUser, setDataUser] = useState(defaultUser)

    const handleUserAdded = () => {
        setRefreshUsers(prev => !prev);
    };

    useEffect(() => {
        console.log('action', actionUser);
        console.log('dataUser', dataUser)
    }, [actionUser, dataUser])


    return (
        <div className="container mt-5">
            <h1 className='d-block my-5 text-center btn btn-success'>CRUD USER BASIC</h1>
            <div className="row">
                <div className="col-3">
                    <ActionUser
                        defaultUser={defaultUser}
                        onUserAdded={handleUserAdded}
                        setActionUser={setActionUser}
                        action={actionUser}
                        dataUser={dataUser}
                    />
                </div>

                <div className="col-9">
                    <Users
                        refresh={refreshUsers}
                        setActionUser={setActionUser}
                        setDataUser={setDataUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;