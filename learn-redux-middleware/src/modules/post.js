import * as postApI from '../api/posts';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POIST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';

export const getPosts = () => async dispatch => {
    dispatch({ type:GET_POSTS});
    try {
        const posts = await postApI.getPost();
        dispatch({type:GET_POSTS_SUCCESS}, posts)
    } catch(e) {
        dispatch({type:GET_POSTS_ERROR, error:e});
    }
};

export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST});
    try {
        const post = await postApI.getPostById(id);
        dispatch({ type:GET_POST_SUCCESS, post});
    } catch(e) {
        dispatch({type:GET_POST_ERROR, error:e});
    }
}

const initialState = {
    posts: {
        loading: false,
        data: null,
        error: null
    },
    post: {
        loading: false,
        data:null,
        error: null
    }
};

const posts = (state = initialState, action) => {
    
    switch(action.type) {
        default:
            return '';
    }
}