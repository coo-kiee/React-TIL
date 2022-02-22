import { Route, Routes } from "react-router-dom";
import PostListPage from "../pages/PostListPage";
import PostPage from "../pages/PostPage";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<PostListPage />} />
            <Route path='/:id' element={<PostPage />} />
        </Routes>
    )
}

export default Routers;