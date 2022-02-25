import { call, put } from "redux-saga/effects";

export const createPromiseThunk = (type,  promiseCreater) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        dispatch({type});
        try {
            const payload = await promiseCreater(param);
            dispatch({ type: SUCCESS, payload});
        } catch(e) {
            dispatch({ type: ERROR, payload: e, error: true});
        }
    };
};

export const reducerUtils = {

    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error:null
    }),
    success: (payload) => ({
        loading: false,
        data: payload,
        error: null
    }),
    error: (error) => ({
        loading: false,
        data: null,
        error: error
    })
};

export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    ...reducerUtils.loading(keepData && state.data)
                };
            case SUCCESS:
                return {
                    ...state,
                    ...reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    ...reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    }
}

const defaultIdSelector = param => param;
export const createPromiseThunkById = (
    type, promiseCreater, idSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        const id = idSelector(param);
        dispatch({ type, meta: id});
        try {
            const payload = await promiseCreater(param);
            dispatch({ type: SUCCESS, payload, meta: id});
        } catch(e) {
            dispatch({ type: ERROR, payload: e, meta: id, error: true});
        }
    }
}

export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        const id = action.meta;
        switch(action.type) {
            case type:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]: reducerUtils.loading(
                            keepData && state[key][id] && state[key][id].data
                        )
                    }
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]: reducerUtils.success(action.payload)
                    }
                };
            case ERROR:
                return {
                    ...state,
                    [key]:{
                        ...state[key],
                        [id]: reducerUtils.error(action.payload)
                    }
                };
            default:
                return state;
        }
    };
};

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreater) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* saga(action) {
        try {
            const payload = yield call(promiseCreater, action.payload);
            yield put({type: SUCCESS, payload});
        } catch(e) {
            yield put({type:ERROR, error:true, payload:e});
        };
    };
}

export const createPromiseSagaById = (type, promiseCreater) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return function* saga(action) {
        const id = action.meta;
        try {
            const payload = yield call(promiseCreater, action.payload);
            yield put({ type:SUCCESS, payload, meta:id});
        } catch(e) {
            yield put({ type:ERROR, error:e, meta:id});
        }
    };
}