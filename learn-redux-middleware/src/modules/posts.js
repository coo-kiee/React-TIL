import * as postsApI from '../api/posts';
import { createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';


export const getPosts = createPromiseThunk(GET_POSTS, postsApI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsApI.getPostById);

// asyncUtils의 createPromiseThunk로 교체
// export const getPosts = () => async dispatch => {
//     dispatch({ type:GET_POSTS});
//     try {
//         const posts = await postApI.getPosts();
//         dispatch({type:GET_POSTS_SUCCESS}, posts)
//     } catch(e) {
//         dispatch({type:GET_POSTS_ERROR, error:e});
//     }
// };

// asyncUtils의 createPromiseThunkById로 교체
// export const getPost = id => async dispatch => {
//     dispatch({ type: GET_POST});
//     try {
//         const post = await postApI.getPostById(id);
//         dispatch({ type:GET_POST_SUCCESS, post});
//     } catch(e) {
//         dispatch({type:GET_POST_ERROR, error:e});
//     }
// }

const initialState = {...reducerUtils.initial(), post:{}};

const posts = (state = initialState, action) => {
    
    switch(action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            const postsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
            return postsReducer(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            const postReducer = handleAsyncActionsById(GET_POST, 'post', true);
            return postReducer(state, action);
        default:
            return state;
    }
}

export default posts;