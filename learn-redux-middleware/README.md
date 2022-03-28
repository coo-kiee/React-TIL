# Redux Middleware (Redux-thunk / Redux-saga)
#### https://react.vlpt.us/

- npm i redux react-redux //react에 redux를 적용하기 위해서 필요
- npm i redux -logger //logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
- npm i redux-devtools-extension //createStore 파라미터에 composeWithDevTools() 추가
- npm i redux-thunk
- npm i react-router-dom

MiddleWare Flow : store > next > action

### Redux-thunk
redux-thunk : 리덕스 미들웨어로 함수를 디스패치 할 수 있다, 함수에서 dispatch와 getState를 파라미터로 받아오는 함수가 필요한데 이 함수를 만들어 주는 함수를 thunk라고 부른다.

#### API 재로딩 문제
1) 특정 포스트를 열은 다음에 뒤로 갔을 때, 포스트 목록을 또 다시 불러오게 되면서 로딩중...이 나타남
2) 특정 포스트를 읽고, 뒤로 간 다음에 다른 포스트를 열면 이전에 열었던 포스트가 잠깐 보여졌다가 로딩중... 이 보여짐   
**JavaScript 화살표 함수 주의사항**   
화살표 함수 - JavaScript | MDN에 따르면 화살표 함수의 경우 괄호()로 감싸진 부분이 return 된다(return문을 작성하지 않아도 return 됨).   
반면에 중괄호{}로 감싸진 다음과 같은 함수는 return문이 없다면 return 값을 반환하지 않는다.   

프로젝트 Custom : state값 posts로 통일

### Redux-saga
- npm i react redux-saga

redux-saga : 애플리케이션의 side effect를 보다 쉽게 처리할 수 있게해주는 라이브러리. 비동기 작업을 처리할 때 액션을 일시정지하거나, 기존 작업을 취소하는 등 액션을 컨트롤 할 수 있다.

Generator 문법 : ES6부터 생긴 문법으로 함수가 결과값을 여러번 반환하거나, 함수를 멈추거나, 되돌아가게 할 수 있다. (function* 키워드와 return 대신 yield 사용)

Redux-Saga Flow : Dispatch(SagaAction) 실행 > 서비스 로직 & Action 생성함수 실행 > Dispatch(action) 실행 > Reducer 실행(Store -> View)

**애로사항** : react-router-dom v6을 사용해서 useHistory 대신 useNavigate를 사용해 구현하면서 Router에 useHistory를 Props로 주는게 아닌 컴포넌트에서 액션에 useNavigate를 담아서 Thunk와 Saga에서 사용했다.