import Spinner from 'react-bootstrap/Spinner';

function Loading(props) {
    return (
        <div className='d-flex align-items-center justify-content-center gap-2' style={{ minHeight: '25vh' }}>
            <div>
                <Spinner animation="border" role="status" variant='primary' />
            </div>
            <span style={{ color: '#0d6efd', fontWeight: '600' }}>{props.content}</span>
        </div>
    );
}

export default Loading;