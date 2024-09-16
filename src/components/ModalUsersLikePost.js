import { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StoreContext } from "../store/StoreContext";

function ModalUsersLikePost(props) {
    const { width } = useContext(StoreContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(props.data)
    }, [props.data])

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} fullscreen={width < 467}>
                <Modal.Header closeButton>
                    <Modal.Title>{users.length} lượt thích</Modal.Title>
                </Modal.Header>
                {users.length > 0 ?
                    <Modal.Body className="row">
                        {users.map((user, index) => (
                            <h5 key={index}>{user.username}</h5>
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