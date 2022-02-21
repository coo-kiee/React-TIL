const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const posts = [
    {
        id:1,
        title:'redux-middleware',
        body:'redux-middleware-body'
    },
    {
        id:2,
        title:'redux-thunk',
        body:'redux-thunk'
    },
    {
        id:3,
        title:'redux-saga',
        body:'redux-saga'
    }
];

export const getPosts = async () => {
    await sleep(500);
    return posts;
}

export const getPostById = async id => {
    await sleep(500);
    return posts.find(post => post.id === id)
}