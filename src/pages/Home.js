import Posts from '../components/Posts';
import { PostsProvider } from '../store/PostsContext';

function Home() {

    return (
        <div className="container mt-5">
            <PostsProvider>
                <Posts />
            </PostsProvider>
        </div>
    );
}

export default Home;