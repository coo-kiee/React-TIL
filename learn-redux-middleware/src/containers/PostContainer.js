import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { getPost } from "../modules/posts";
import { goToHome } from "../modules/postsSaga";

const PostContainer = ({postId}) => {

    const {data, loading, error} = useSelector(state => state.posts.post[postId]) || {
        data: null,
        loading: false,
        error: null
      };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        
        dispatch(getPost(postId));

    },[postId, dispatch]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return (
        <>
            <button onClick={() => dispatch(goToHome(navigate))}>홈으로 이동</button>
            <Post post={data} />;
        </>
    )
    
}

export default PostContainer;