import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';

function UploadImage(props) {

    const handleUploadImage = (e) => {
        const file = e.target.files[0]

        if (file && file.size > 2 * 1024 * 1024) { 
            toast('File quá lớn, vui lòng chọn file nhỏ hơn 2MB');
            return;
        }        

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                Resizer.imageFileResizer(
                    file,
                    300,
                    300,
                    'JPEG',
                    70,
                    0,
                    (uri) => {
                        props.setImages([...props.images, uri]);
                    },
                    'base64'
                );
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <input
                accept="image/*"
                className='d-none'
                id='image'
                type="file"
                onChange={(e) => handleUploadImage(e)}
            />
            <label htmlFor='image' className='btn btn-success'>Thêm ảnh</label>
        </>
    );
}

export default UploadImage;