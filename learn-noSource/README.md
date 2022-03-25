# leran-noSource
도움이 되는 정보가 많은 Git
#### https://github.com/positiveko

## Git
1. Bash
SSH 커밋
#### https://coding-factory.tistory.com/244
env 파일 커밋
#### https://zoosso.tistory.com/835
Bash 커밋 히스토리 조회
#### https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EC%BB%A4%EB%B0%8B-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0

## React FTP 배포 방법
#### https://mesonia.tistory.com/44
npm run build 실행 > 배포 위치에 build 폴더 내부 파일 복사 > index.html의 절대경로로 상대경로로 변경(="/ => ="./)
**※ 업무시에 절대경로로 사용했다 > 이유?**

index.html의 절대경로를 안바꾸고 사용하는 방법 - package.json: "homepage":"./" 설정
#### https://stackoverflow.com/questions/46510538/how-upload-reactjs-project-to-ftp

**※ 배포용 env에 추가 - PUBLIC_URL=/도메인**

## 폴더 구조(Directory Structure)

domain/service/component/store/common/routes 형식의 구조
#### https://smoh.tistory.com/385

Redux ToolKit을 이용한 features/common/style/app/routes 형식의 구조
#### https://javascript.plainenglish.io/redux-toolkit-the-standard-way-to-write-redux-dcfb372202b8
#### https://javascript.plainenglish.io/how-to-structure-your-react-redux-app-83d523851137

## async/await와 setState 함수
#### https://codingapple.com/unit/react-setstate-async-problems/

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

## CORS
#### https://evan-moon.github.io/2020/05/21/about-cors/

CORS는 'Cross-Origin Resource Sharing'의 약어로, 교차 출처 리소스 공유 방식을 말한다.

CORS 문제가 발생하는 예시를 먼저 정리하면,

사용자가 이용하는 브라우저에서 로그인 하려고 한다 > 브라우저는 로그인 정보를 서버에 요청한다 > 서버에서 로그인 정보를 확인하고 결과를 브라우저로 응답한다.

이때 사용자가 이용하는 브라우저의 주소가 서버에서 허용한 주소와 동일한지 여부를 판단해서 일치하지 않으면 브라우저는 CORS 에러를 출력한다.   
(ex. 내가 github.com에 로그인하려고 한다 > 서버에서 응답을 보내줄 때 github.com이 허용된 주소라고 보내준다면 '로그인 성공')

보통 사용자들이 이용할 때 이 문제는 발생할 확률이 적다. 대신 프론트엔드 개발자들이 개발할 때 이와같은 문제가 발생한다.

로컬에서 개발을 하면 localhost:8080 등으로 브라우저에서 서버로 보내는 주소가 설정되기 때문이다.

이를 해결하기 위해서는 서버쪽에서 결과 응답을 보내줄 때 Header에 Access-Control-Allow-Origin 값을 '*'로 설정해주거나, localhost:8080로 변경해야한다.

다른 해결방법으로는 Webpack Dev Server를 이용하는 방법이 있지만 process.env 빌드 환경변수를 사용하여 분기 로직을 작성해야 한다.   

## 옵셔널 체이닝(optional chaining) '?.'
#### https://ko.javascript.info/optional-chaining
?. - 앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환 // ?.는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다.

## Router Link Tag와 a Tag 차이
#### https://firsteast.tistory.com/136
Link 태그는 브라우저의 주소만 바꾸고 페이지를 새로고침하지 않는다 - React state가 유지된다.

a 태그는 페이지를 새로고침 한다 - React state가 초기화 된다.

Link Tag 에서는 External URL을 사용하지 않고 a Tag를 사용한다.   
ex. http://localhost:3000 으로 앱을 실행중인데 Link to="http://naver.com" 사용하는 경우

External URL이란? - App이 작동하는 url이 아닌 다른 url 주소를 사용하는 것
#### https://stackoverflow.com/questions/67847263/how-do-i-redirect-to-an-external-link-in-react


## css파일 public 폴더 image 접근

public 폴더에 image를 추가했을 때 css파일에서 접근하는 방식은 CRA 4.0 이상 버전부터 막혔다.

styled-components로 cGs(createGlobalStyle)을 생성하고 backtick(`) 안에 javascript 템플릿 리터럴로 넣어주면 접근 가능하다.   
ex. background: url('${process.env.PUBLIC_URL}/images/bg_main.jpg'

## styled-components @import
#### https://jungpaeng.tistory.com/70
#### https://github.com/styled-components/styled-components/issues/2911#issuecomment-592012166
Warning Message : Please do not use @import CSS syntax in createGlobalStyle at this time, ~

css파일에 있는 @import를 styled-components로 cGs(createGlobalStyle)로 만들때 @import 소스를 같이 사용하면 해시 스타일이 적용되지 않는 이슈 발생   
ex. @import url('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css');

때문에 public 폴더에 있는 index.html에 link tag를 이용해서 import 해야한다.   
ex .<link href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' rel='stylesheet' type='text/css'>

P.S Refactor_helmet 으로 해결하는 방법 및 이슈에 대한 추가적인 설명
#### https://choi95.tistory.com/169

## meta Tag - x-ua-compatible 의미
#### https://gocoder.tistory.com/161

브라우저 호환성 보기 설정을 지정해준다.   
ex. <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

## 폴리필(polyfill)
#### https://iancoding.tistory.com/175
#### https://tyboss.tistory.com/entry/Javascript-Polyfill-Modernizr-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-cross-browser
폴리필(polyfill)은 웹 개발에서 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드를 뜻한다.

참조 링크처럼 직접 구현해도 되고, 나의 경우 public폴더 index.html head Tag 하단에 import 링크를 추가했다.   
ex. <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script> - 브라우저 환경에 맞게 자동으로 스크립트 로딩

## event target vs currentTarget 차이점
event.target은 이벤트가 위임되어 발생하는 위치를 반환하지만,
currentTarget은 이벤트 핸들러가 부착된 위치를 반환한다.

ex. <ul onClick={handleOnclick} > <li> ... <li> </ul>
event.target => <li> Tag
currentTarget => <ul> Tag



## 브라우저 렌더링 성능 최적화
#### https://abcdqbbq.tistory.com/45

### 리플로우/리페인트
리플로우(Reflow) - DOM이 추가/삭제 되거나 DOM 요소에 높이, 너비, 위치 등의 기하학적인 영향을 주는 CSS 내용이 변경될 경우 렌더링 트리가 재구성 되는 현상

리페인트(Fepaint) - 기하학적인 영향을 주지 않는 CSS 속성이 변경 되었을 경우 Paint 과정부터 수행하는 현상

리플로우는 부하가 크지만 리페인트는 부하가 적다.

P.S. 리플로우/리페인트 최소화 하는 방법
#### https://12bme.tistory.com/140

P.S. 렌더링 트리(Critical Rendering Tree)
#### https://breathtaking-life.tistory.com/25

### display none

React CSS display none 사용시 발생하는 현상
#### https://lovemewithoutall.github.io/it/at-css-display-change-what-happen-in-react/

조건부 렌더링 vs display none
#### https://ssangq.netlify.app/posts/conditional-rendering-vs-diplay-none

## React 이미지 경로 설정

이미지 경로 설정하는 4가지 방법 간략한 설명
#### https://codingapple.com/forums/topic/%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B4%80%EB%A0%A8/

이미지 경로를 설정하는 4가지 방법에 대한 자세한 설명
#### https://velog.io/@rimo09/React-Create-react-app-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B2%BD%EB%A1%9C%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-4%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95