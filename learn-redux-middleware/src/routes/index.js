import { Route, Routes } from "react-router-dom";
import PostListPage from "../pages/PostListPage";
import PostPage from "../pages/PostPage";

const Routers = () => {
    
    return (
        <Routes>
            <Route path='/' element={<PostListPage />} />
            <Route path=':id' element={<PostPage />} /> {/* react-router-dom ver6 부터 상대경로 사용 가능 */}
        </Routes>
    )
}

export default Routers;