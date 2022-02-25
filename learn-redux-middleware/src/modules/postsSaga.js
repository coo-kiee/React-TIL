import { call, put, takeEvery } from 'redux-saga/effects';
import * as postsApI from '../api/posts';
import { createPromiseSaga, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const GO_TO_HOME = 'GO_TO_HOME';


export const getPosts = () => ({type:GET_POSTS});
export const getPost = (id) => ({type:GET_POST, payload: id, meta: id});
export const goToHome = (navigate) => ({type: GO_TO_HOME, navigate});

// function* watchGetPosts() {
//     try {
//         const posts = yield call(postsApI.getPosts);
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             payload: posts
//         });
//     } catch(e) {
//         yield put({
//             type: GET_POSTS_ERROR,
//             error: true,
//             payload: e
//         });
//     }
// }

// function* watchGetPost(action) {
//     const param = action.payload;
//     const id = action.meta;
//     try {
//         const post = yield call(postsApI.getPostById, param);
//         yield put({
//             type: GET_POST_SUCCESS,
//             meta: id,
//             payload: post
//         });
//     } catch(e) {
//         yield put({
//             type: GET_POST_ERROR,
//             payload: e,
//             error: true
//         });
//     }
// }

const watchGetPosts = createPromiseSaga(GET_POSTS, postsApI.getPosts);
const watchGetPost = createPromiseSaga(GET_POST, postsApI.getPostById);

function* goToHomeSaga(action) {
    action.navigate('/');
}

// 사가들을 합치기
export function* postSaga() {
    yield takeEvery(GET_POSTS, watchGetPosts);
    yield takeEvery(GET_POST, watchGetPost);
    yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

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