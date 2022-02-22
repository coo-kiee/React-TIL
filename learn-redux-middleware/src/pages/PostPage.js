import { useParams } from "react-router-dom";
import PostContainer from "../containers/PostContainer"

const PostPage = () => {

    const {id} = useParams();

    console.log(id);

    return <PostContainer postId={parseInt(id, 10)}/>;
}

export default PostPage;