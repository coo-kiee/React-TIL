# React-TIL

## Redux
- npm i redux
- npm i react-redux //react에 redux를 적용하기 위해서 필요
- npm i redux-devtools-extension //createStore 파라미터에 composeWithDevTools() 추가

Action : 객체, type을 필수로 가짐, type에 따라 실행 로직 제어   
**※ 액션이름 앞에 파일 이름을 넣는다. (ex. const INCREASE = "COUNT/INCREASE" - 상수로 정의)**

Action 생성함수 : 함수, action 객체를 생성하는 함수

Dispatch(action) : 함수, action 객체를 통해서 Reducer를 실행

Reducer(state, aciton) : 함수, Dispatch에서 전달받은 action을 통해 state를 변경

Redux Flow : Action 생성함수 실행 > Dispatch(action) 실행 > Reducer 실행(Store -> View) - Flux 패턴

Redux Module 구성(JS 파일) : 액션 타입, 액션 생성함수, 리듀서 - Ducks 패턴

rootReducer(Path: reducerModules/index.js) : 여러개의 리듀서 병합 - combineReducers 함수 사용   
**※ 하나의 어플리케이션은 리듀서 1개 스토어 1개로 구성한다**

Store : 리듀서를 담기 위한 저장공간

#### 프리젠테이셔널 컴포넌트 & 컨테이너 컴포넌트 - Hooks 출시 이후로 더이상 권장하지 않음
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

## Redux Middleware (Redux-thunk / Redux-saga)

## SWC
Next.JS 프레임워크에서 사용하는 Compiler Babel과 Tersar를 대체하며, build 속도를 최대 5배  향상 시킨다. 이유 : 싱글스레드 자바스크립트를 멀티쓰레드 방식으로 build

## CORS
### https://evan-moon.github.io/2020/05/21/about-cors/

CORS는 'Cross-Origin Resource Sharing'의 약어로, 교차 출처 리소스 공유 방식을 말한다.

CORS 문제가 발생하는 예시를 먼저 정리하면,

사용자가 이용하는 브라우저에서 로그인 하려고 한다 > 브라우저는 로그인 정보를 서버에 요청한다 > 서버에서 로그인 정보를 확인하고 결과를 브라우저로 응답한다.

이때 사용자가 이용하는 브라우저의 주소가 서버에서 허용한 주소와 동일한지 여부를 판단해서 일치하지 않으면 브라우저는 CORS 에러를 출력한다.   
(ex. 내가 github.com에 로그인하려고 한다 > 서버에서 응답을 보내줄 때 github.com이 허용된 주소라고 보내준다면 '로그인 성공')

보통 사용자들이 이용할 때 이 문제는 발생할 확률이 적다. 대신 프론트엔드 개발자들이 개발할 때 이와같은 문제가 발생한다.

로컬에서 개발을 하면 localhost:8080 등으로 브라우저에서 서버로 보내는 주소가 설정되기 때문이다.

이를 해결하기 위해서는 서버쪽에서 결과 응답을 보내줄 때 Header에 Access-Control-Allow-Origin 값을 '*'로 설정해주거나, localhost:8080로 변경해야한다.

다른 해결방법으로는 Webpack Dev Server를 이용하는 방법이 있지만 process.env 빌드 환경변수를 사용하여 분기 로직을 작성해야 한다.   

## Recoil

## Mobx

## 옵셔널 체이닝
?. - 앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환 // ?.는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다.

## Print & PDF Download

## Excel

## Multiple-Files-Upload + Server(Node)

## Node JS 프로젝트 구조