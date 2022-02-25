import { all } from 'redux-saga/effects';
import { combineReducers } from "redux";
// import counter from "./counter";
import counter, { watchCounter } from "./counterSaga";
import posts from "./postsSaga";
import { postSaga } from './postsSaga';

const rootReducer = combineReducers({counter, posts});

export function* rootSaga() {
    yield all([watchCounter(), postSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;