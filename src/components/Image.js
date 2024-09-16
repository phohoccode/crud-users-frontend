function Image(props) {

    const handleDeleteImage = (index) => {
        if (props.data.images && props.data.images.length > 1) {
            const newImages = [...props.data.images];
            newImages.splice(index, 1);
            props.setImages(newImages);
        } else {
            props.setImages([]);
        }
    }

    return (
        <div className={`col-6 col-sm-${props.col} position-relative`}>
            <img
                style={{maxHeight: '420px'}}
                className={`w-${props.width} h-${props.height} rounded-3`}
                src={props.data.image.url || props.data.image}
            />
            {props.show &&
                <svg
                    style={{ position: 'absolute', top: '-8px', color: '#ccc', right: '6px' }}
                    onClick={() => handleDeleteImage(props.data.index)}
                    className='delete-image bi bi-x-circle-fill'
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>}
        </div>
    );
}

export default Image;