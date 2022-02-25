import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'counter/INCREASE'; // Ducks 패턴 - 리덕스 모듈 액션 이름 중복 방지
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

const initialState = 0;


function* increaseSaga() {
    yield delay(1000); // 1초를 기다립니다.
    yield put(increase()); // put은 특정 액션을 디스패치 해줍니다.
}

function* decreaseSaga() {
    yield delay(1000); 
    yield put(decrease()); 
  }

export function* watchCounter() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
    yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

const counter = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}

export default counter;