import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalUsersLikePost(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(props.data)
    }, [props.data])

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{users.length} lượt thích</Modal.Title>
                </Modal.Header>
                {users.length > 0 ?
                    <Modal.Body className="row">
                        {users.map((user, index) => (
                            <h5 key={index}>{user.userLikePost}</h5>
                        ))}
                    </Modal.Body> : 
                    <Modal.Body>Chưa có lượt thích</Modal.Body>
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUsersLikePost;