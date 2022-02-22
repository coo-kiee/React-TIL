# React-TIL
# 벨로퍼트와 함께하는 모던 리액트
## learn-redux
- npm i redux
- npm i react-redux //react에 redux를 적용하기 위해서 필요
- npm i redux-devtools-extension //createStore 파라미터에 composeWithDevTools() 추가

Action : 객체, type을 필수로 가짐, type에 따라 실행 로직 제어

Action 생성함수 : 함수, action 객체를 생성하는 함수

Dispatch(action) : 함수, action 객체를 통해서 Reducer를 실행

Reducer(state, aciton) : 함수, Dispatch에서 전달받은 action을 통해 state를 변경

Redux Flow : Action 생성함수 실행 > Dispatch(action) 실행 > Reducer 실행

Redux Module 구성(JS 파일) : 액션 타입, 액션 생성함수, 리듀서 - Ducks 패턴

rootReducer(Path: reducerModules/index.js) : 여러개의 리듀서 병합 - combineReducers 함수 사용   
※ 하나의 어플리케이션은 리듀서 1개 스토어 1개로 구성한다.

Store : 리듀서를 담기 위한 저장공간

#### 프리젠테이셔널 컴포넌트 : 
- 리덕스 스토어에 직접 접근하지 않고 필요한 값이나 함수를 props로 받아서 사용하는 컴포넌트
- UI를 선언하는 것에 집중, 필요한 값이나 함수를 props로 받아서 사용

#### 컨테이너 컴포넌트 : 
- App.js에 랜더링 되는 컴포넌트
- 리덕스 스토어의 상태 조회, 액션을 디스패치 할 수 있는 컴포넌트 - useSelector, useDispatch 함수 사용
- HTML 태그들을 사용하지 않고, 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용 - 상태와 액션을 디스패치 하는 함수를 프리젠테이셔널 컴포넌트에 props로 넣어준다.
- useSelector : 리덕스 스토어의 상태를 조회하는 Hook, state값은 store.getState() 함수를 호출 했을 때 나타나는 결과물과 동일   
(ex. useSelector(state => state.todos))
- useDispatch : 리덕스 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 Hook

## learn-redux-middleware
- npm i redux react-redux //react에 redux를 적용하기 위해서 필요
- npm i redux -logger //logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
- npm i redux-devtools-extension //createStore 파라미터에 composeWithDevTools() 추가
- npm i redux-thunk
- npm i react-router-dom

redux-thunk : 리덕스 미들웨어로 함수를 디스패치 할 수 있다, 함수에서 dispatch와 getState를 파라미터로 받아오는 함수가 필요한데 이 함수를 만들어 주는 함수를 thunk라고 부른다.

API 재로딩 문제 : 
1) 특정 포스트를 열은다음에 뒤로 갔을 때, 포스트 목록을 또 다시 불러오게 되면서 로딩중...이 나타남
2) 특정 포스트를 읽고, 뒤로 간 다음에 다른 포스트를 열면 이전에 열었던 포스트가 잠깐 보여졌다가 로딩중... 이 보여짐   
**JavaScript 화살표 함수 주의사항**   
화살표 함수 - JavaScript | MDN에 따르면 화살표 함수의 경우 괄호()로 감싸진 부분이 return 된다(return문을 작성하지 않아도 return 됨).   
반면에 중괄호{}로 감싸진 다음과 같은 함수는 return문이 없다면 return 값을 반환하지 않는다.   
출처: https://velog.io/@bigbrothershin/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%99%80-%EC%82%AC%EC%9A%A9%EC%83%81-%EC%A3%BC%EC%9D%98%ED%95%A0-%EC%A0%90
