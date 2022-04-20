# React

## 폴더 구조(Directory Structure)

domain/service/component/store/common/routes 형식의 구조   
(https://smoh.tistory.com/385)

Redux ToolKit을 이용한 features/common/style/app/routes 형식의 구조   
(https://javascript.plainenglish.io/redux-toolkit-the-standard-way-to-write-redux-dcfb372202b8)   
(https://javascript.plainenglish.io/how-to-structure-your-react-redux-app-83d523851137)

## Hooks와 Closure
#### https://www.rinae.dev/posts/getting-closure-on-react-hooks-summary

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

## Router Link Tag와 a Tag 차이
#### https://firsteast.tistory.com/136
Link 태그는 브라우저의 주소만 바꾸고 페이지를 새로고침하지 않는다 - React state가 유지된다.

a 태그는 페이지를 새로고침 한다 - React state가 초기화 된다.

Link Tag 에서는 External URL을 사용하지 않고 a Tag를 사용한다.   
ex. http://localhost:3000 으로 앱을 실행중인데 Link to="http://naver.com" 사용하는 경우

External URL이란? - App이 작동하는 url이 아닌 다른 url 주소를 사용하는 것   
(https://stackoverflow.com/questions/67847263/how-do-i-redirect-to-an-external-link-in-react)

## css파일 public 폴더 image 접근

public 폴더에 image를 추가했을 때 css파일에서 접근하는 방식은 CRA 4.0 이상 버전부터 막혔다.

styled-components로 cGs(createGlobalStyle)을 생성하고 backtick(`) 안에 javascript 템플릿 리터럴로 넣어주면 접근 가능하다.   
ex. background: url('${process.env.PUBLIC_URL}/images/bg_main.jpg'

## styled-components 
styled-components 사용하는 8가지 이유 - 번역
#### https://analogcoding.tistory.com/181

@import 사용   
#### Warning Message : Please do not use @import CSS syntax in createGlobalStyle at this time, ~
(https://jungpaeng.tistory.com/70)  
(https://github.com/styled-components/styled-components/issues/2911#issuecomment-592012166)   

css파일에 있는 @import를 styled-components로 cGs(createGlobalStyle)로 만들때 @import 소스를 같이 사용하면 해시 스타일이 적용되지 않는 이슈 발생   
ex. @import url('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css');

때문에 public 폴더에 있는 index.html에 link tag를 이용해서 import 해야한다.   
ex. 
```
<link href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' rel='stylesheet' type='text/css'>"
```

P.S Refactor_helmet 으로 해결하는 방법 및 이슈에 대한 추가적인 설명
#### https://choi95.tistory.com/169

## React18

### Automatic Batching
Automatic Batching 이전 이슈   
(https://codingapple.com/unit/react-setstate-async-problems/)

**함수형 업데이트와 헷갈릴 수 있기 때문에 같이 알아두자**
함수형 업데이트   
(https://garve32.tistory.com/39)

Automatic Batching을 사용하려면 아래처럼 사용
```
ReactDOM.render(<App />, document.getElementById('root')) >>>>>> ReactDOM.createRoot(<App />, document.getElementById('root'))
```
(https://nyol.tistory.com/146)

P.S. Hydrate:
```
ReactDOM.hydrate(<App tab="home" />, container); > ReactDOMClient.hydrateRoot(container, <App tab="home" />);
```
(https://github.com/reactwg/react-18/discussions/5)   

P.S. React Hydrate란? - SSR 렌더링   
(https://simsimjae.tistory.com/389)   
(https://velog.io/@huurray/React-Hydration-%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)   

의문점1: 함수형 업데이트로 state 변경 시 batching으로 인해 업데이트 된 State를 사용할 수 없는지?(함수형 업데이트에 대한 이해 부족으로 생각한 바보 같은 의문이지만 나중에 까먹을까봐 적음)
>> 함수형 업데이트는 기존에 함수 batching 상태에서도 큐에 저장된 순서대로 state를 사용해서 항상 최신의 state를 유지하기 때문에 automatic Batching 에서도 적용된다.

## React 이미지 경로 설정

### 이미지 경로 설정하는 4가지 방법 간략한 설명   
(https://codingapple.com/forums/topic/%EB%B0%B1%EA%B7%B8%EB%9D%BC%EC%9A%B4%EB%93%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B4%80%EB%A0%A8/)

### 이미지 경로를 설정하는 4가지 방법에 대한 자세한 설명   
(https://velog.io/@rimo09/React-Create-react-app-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EA%B2%BD%EB%A1%9C%EB%A5%BC-%EC%84%A4%EC%A0%95%ED%95%98%EB%8A%94-4%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)


## useState 함수형 업데이트
#### https://velog.io/@tjdgus0528/React-Native-5x048oii

함수형 업데이트를 사용하면 다음 랜더링 값을 사용할 수 있다.
But, 해당 변수를 변경하는 setState가 아닌 다른 곳에서는 랜더링 된 값만 사용 가능하다.
ex.
```
const [value, setValue] = useState(0);
setValue(prev => prev + 1); // value = 1
setValue(prev => prev + 1); // value = 2
const now = value; // now = 0
```

## React Hooks 규칙
#### https://reactjs.org/warnings/invalid-hook-call-warning.html
1. Hooks는 컴포넌트 최상단 스코프 또는 커스텀 Hooks에 선언되어야 한다.
2. 반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하면 안된다.
3. 이벤트핸들러 내부에 선언하면 안된다.
4. useMemo 안에 선언하면 안된다.
5. Class 컴포넌트 내부에 선언하면 안된다.

## 브라우저 렌더링 성능 최적화
#### https://abcdqbbq.tistory.com/45

### 리플로우/리페인트
리플로우(Reflow) - DOM이 추가/삭제 되거나 DOM 요소에 높이, 너비, 위치 등의 기하학적인 영향을 주는 CSS 내용이 변경될 경우 렌더링 트리가 재구성 되는 현상

리페인트(Fepaint) - 기하학적인 영향을 주지 않는 CSS 속성이 변경 되었을 경우 Paint 과정부터 수행하는 현상

리플로우는 부하가 크지만 리페인트는 부하가 적다.

P.S. 리플로우/리페인트 최소화 하는 방법   
(https://12bme.tistory.com/140)

P.S. 렌더링 트리(Critical Rendering Tree)   
(https://breathtaking-life.tistory.com/25)

### display none
React CSS display none 사용시 발생하는 현상  
(https://lovemewithoutall.github.io/it/at-css-display-change-what-happen-in-react/)

조건부 렌더링 vs display none   
(https://ssangq.netlify.app/posts/conditional-rendering-vs-diplay-none)

## Script 동적 로딩
#### http://daplus.net/javascript-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EA%B0%80%EB%A1%9C%EB%93%9C-%EB%90%9C-%ED%9B%84-%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C/
#### #### https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript

```
const getScript = (url) => new Promise((resolve, reject) => {

    const script = document.createElement('script')
    script.type = "text/javascript";
    script.src = url
    script.async = true

    script.onerror = (e) => reject(e);
    script.onload = () => {
        resolve();
    };
    
    document.body.appendChild(script);
});

// App.js
useEffect(() => {

    const getNaverMap = async () => {

      try {

        // 네이버 지도 API 비동기 호출
        await getScript("https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId={클라이언트 ID}&submodules=geocoder");
        
        // naver 객체 변수 할당
        const naverObj = window.naver;

        // onJSContentLoaded는 submodules이 로드 된 후에 실행하는 이벤트 핸들러이다.
        naverObj.maps.onJSContentLoaded = () => {
          naverMapService.initMap(naverObj);
          setNaver(prev => naverObj);
        };

      }
      catch (error) {
        console.log(error);
      };
    }; // end getNaverMap()

    if (!naver) {
      // naver 지도 세팅
      getNaverMap();
    };

}, []);

```

## Error 모음
Unexpected Unicode - 퍼블리싱 작업파일 옮겨서 사용할 때 발생하는 에러 > 새로 js 파일 만들어서 내용 옮겨주면 사라짐