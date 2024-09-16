import PostInteract from "./PostInteract";
import Dropdown from 'react-bootstrap/Dropdown';
import Image from "./Image";
import { formatDate } from "../utils";
import { useContext } from "react";
import { StoreContext } from "../store/StoreContext";
import { PostsContext } from "../store/PostsContext";

function Post(props) {
    const { userStore } = useContext(StoreContext)
    const {
        handleEditPost,
        handleDeletePost,
        getAllUsersLikePost,
        handleCommentPost
    } = useContext(PostsContext)
    const {
        index,
        post,
        posts,
        fetchAllPost
    } = props

    return (
        <>
            <div className="card col-12" key={index}>
                <div className="card-body">
                    <div className='my-2'>
                        <div className='d-flex justify-content-between'>
                            <span
                                className='d-flex align-items-center gap-1'
                                style={{ color: '#0d6efd', fontWeight: '600' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                                {post.username} · {(formatDate(post.created_at))}
                            </span>
                            {userStore.id === post.user_id &&
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Tuỳ chọn
                                    </Dropdown.Toggle>
    
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => handleDeletePost(post, fetchAllPost)}
                                            className='d-flex align-items-center gap-1'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                            Xoá
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleEditPost(post)}
                                            className='d-flex align-items-center gap-1'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                            Chỉnh sửa
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>}
                        </div>
                    </div>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <div className='row row-gap-4'>
                        {post.images.map((image, index) => (
                            <Image
                                col={'3'}
                                width={'100'}
                                height={'100'}
                                key={index}
                                show={false}
                                data={{
                                    image: image.url,
                                    index,
                                    images: post.images
                                }}
                            />
                        ))}
                    </div>
                    <div className='d-flex justify-content-between my-3'>
                        <span
                            style={{ color: '#0d6efd', cursor: 'pointer' }}
                            onClick={() => getAllUsersLikePost(post.post_id, posts)}
                        >{post.usersLikePost.length} lượt thích</span>
                        <span
                            style={{ color: '#0d6efd', cursor: 'pointer' }}
                            onClick={() => handleCommentPost(post)}>
                            {post.comment_count} bình luận
                        </span>
                    </div>
    
                    <PostInteract
                        index={index}
                        post={post}
                    />
                </div>
            </div>
        </>
    );
}

export default Post;