# React

## 폴더 구조(Directory Structure)

domain/service/component/store/common/routes 형식의 구조   
(https://smoh.tistory.com/385)

Redux ToolKit을 이용한 features/common/style/app/routes 형식의 구조   
(https://javascript.plainenglish.io/redux-toolkit-the-standard-way-to-write-redux-dcfb372202b8)   
(https://javascript.plainenglish.io/how-to-structure-your-react-redux-app-83d523851137)

## Hooks와 Closure
#### https://www.rinae.dev/posts/getting-closure-on-react-hooks-summary
[useState가 const로 선언되는 이유](https://dudghsx.tistory.com/18)

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
#### https://velog.io/@jhyj0521/FE-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-feat.-Shall-We-Trip-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8
#### https://abcdqbbq.tistory.com/45

## Script 동적 로딩
#### http://daplus.net/javascript-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EA%B0%80%EB%A1%9C%EB%93%9C-%EB%90%9C-%ED%9B%84-%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C/
#### #### https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript

[practice-naver-map 코드](https://github.com/Jowen0/React-TIL/tree/main/practice-naver-map)
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

## 웹서버(Apache) 설정으로 응답속도 줄이는 방법 - GZIP
#### https://taetaetae.github.io/2018/04/01/apache-gzip/

[서버의 설정 없이 웹 페이지의 응답속도를 줄일 수 있는 '일반적인' 방법들 - 웹사이트 최적화 기법](https://book.naver.com/bookdb/book_detail.nhn?bid=4587095)

gzip이란? - 파일 압축에 쓰이는 응용 소프트웨어 // [지원브라우저 확인](https://caniuse.com/#search=gzip)

서버에서 Clinet에게 보낼 Response를 압축해서 보내기 때문에 네트워크 리소스 비용을 줄일 수 있어 응답속도를 빠르게 할 수 있다.

but, 서버에서 압축을 하여 보냈기 때문에 압축을 해체하는 과정이 추가적으로 필요하고, 브라우저에서 CPU 리소스를 사용하면서 오히려 랜더링이 느려질 수 있다.

## REST API
#### https://hyothorhyo.tistory.com/5?category=993136

REST API는 프론트엔드에서 URI와 HTTP method를 조합해서 서버에 요청 하는 형식의 API 이다.
RESTful 하게 만든 API는 요청 형식만 보아도 대략적으로 무엇을 요청하는지 파악이 가능하다.

REST API의 단점은 필요가 없는 정보까지 받게 되는 점인데 이에 비해 GraphQL은 내가 원하는 정보만 골라서 요청할 수 있다.

## GraphQL
GraphQL은 POST만을 사용해서 정보 요청을 한다.
body에 담긴 요청에 따라 필요한 정보만 가져올 수 있다.
URI는 (도메인)/graphql 형식으로 이루어져 있다.

GraphQl의 단점 - 요청형식이 복잡하다.

## ESLint / Prettier
#### https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/
ESLint는 자바스크립트, JSX의 정적 분석 도구로 일관된 코드 스타일을 작성하도록 도와준다.

배포된 공유 설정 사용하기
- npm i -D eslint-config-[설정 이름] or npm add -D eslint-config-[설정 이름]

ESLint를 실행하면 Parser가 자바스크립트 코드를 분석하여 AST를 만들고, 사용할 Parser로 babel-eslint, Esprima 등 선택할 수 있다.(default. Espree)

AST는 컴파일러에서 널리 사용되는 자료구조로 소스코드의 구조를 트리 형태로 표현한 것이다.

[eslint-plugin-import](https://seohyun0120.tistory.com/entry/ESLint-importsexports-%EA%B5%AC%EB%AC%B8%EC%9D%98-%EC%88%9C%EC%84%9C-%EC%9E%90%EB%8F%99-%EC%A0%95%EB%A0%AC%ED%95%98%EA%B8%B0)

[ESLint, Prettier 구성 및 작동 원리](https://helloinyong.tistory.com/325)
ESLint는 코드 퀄리티를 보장하도록 도와주고, Prettier는 코드 스타일을 깔끔하게 혹은 통일되도록 도와준다.

[ESLint, Prettier 설정](https://velog.io/@devstone/Next.js-Typescript-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85-%ED%95%98%EA%B8%B0)

[CNA - Typescript, ESLint, Prettier 설정1](https://velog.io/@devstone/Next.js-Typescript-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85-%ED%95%98%EA%B8%B0)

[CNA - Typescript, ESLint, Prettier 설정2](https://wiki.jjagu.com/?p=479)

## 브라우저 개발자도구에서 소스 감추기
#### https://velog.io/@racoon/React-build-%EC%8B%9C-sourcemap-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0
Build시 souremap을 제거해야 한다.
이유:
1. 내부코드 노출
2. CI에서 docker 등을 이용해서 build할 때 메모리 부족 현상 발생   
(에러메세지: Creating an optimized production build… )

방법 1.
.env에 GENERATE_SOURCEMAP=false 설정 추가

방법 2.
package.json > "build": "GENERATE_SOURCEMAP=false react-scripts build" 로 수정

## Code Spliting
#### https://bamtory29.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EC%BD%94%EB%93%9C-%EC%8A%A4%ED%94%8C%EB%A6%AC%ED%8C%85

브라우저 최적화에 사용되는 Code Spliting 방법 3가지

1. 코드 비동기 로딩 - dynamic import(동적 import)
import 구문은 Promise를 반환하기 때문에 함수 안에서 import를 사용한다.(따라서, async/await 사용 가능)
```
// App.js
const importFn = () => {
    import('./dynamic').then(result => result.dynamic());
};

return (
    <div onClick={importFn}>dynamic import!!!</div>
);

// dynamic.js
const dynamic = () => {
    alert('import suceess!!');
};

export default dynamic;
```

2. React.Lazy, Suspense를 사용한 코드 스플리팅
React v16.6부터 추가된 기능(이전에는 비동기 로딩으로 await와 로딩된 컴포넌트를 담는 state를 매번 선언했다.)
```
// App.js
const [dynamic, setDynamic] = useState(null);
const handleDynamic = async () => {

    const dynamicModule = await import('./dynamic');
    setUseDynamic(() => dynamicModule);
};  

return (
    <div onClick={handleDynamic}>Use Dynamic!!!</div>
    {dynamic && <dynamic/>}
);

// dynamic.js
const Dynamic = () => {
    return (
        <div>Lazy, Suspense Code!!!</div>
    );
};

export default Dynamic;
```

Suspense는 Lazy 로딩되는 컴포먼트를 감싸주고 state 선언하는 작업을 없애준다.
```
// App.js
const [useDynamic, setUseDynamic] = useState(false);
const Dynamic = React.lazy(() => import('./dynamic'));
const handleDynamic = () => {
    setUseDynamic(() => true);
};  

return (
    <div onClick={handleDynamic}>Use Dynamic!!!</div>

    // fallback은 로딩중일 때 보여주는 코드이다.
    <Suspense fallback={<div>Loading...</div>}>
        {useDynamic && <Dynamic/>}
    </Suspense>
);

// dynamic.js
const Dynamic = () => {
    return (
        <div>Lazy, Suspense Code!!!</div>
    );
};

export default Dynamic;
```

3. Loadable Components 라이브러리
#### https://basemenks.tistory.com/247?category=1027041

Loadable Components 라이브러리는 코드 스플리팅과 SSR을 가능하게 해준다.
리액트 공식 문서에서는 SSR을 할 경우 위 라이브러리 사용을 권고하고 있다.

npm 설치: npm add @loadable/component

React.lazy와 Suspense가 빠진 형태로 코드량이 줄어든다.
```
// App.js
import loadable from '@loadable/component';

const Dynamic = loadable(() => import('./dynamic'), {
    // Suspense fallback 역할
    fallback: <div>Loading...</div>
});

const [useDynamic, setUseDynamic] = useState(false);

const handleDynamic = () => {
    setUseDynamic(() => true);
};  

return (
    <div onClick={handleDynamic}>Use Dynamic!!!</div>
    {useDynamic && <Dynamic/>}
);

// dynamic.js
const Dynamic = () => {
    return (
        <div>Loadable Component  Code!!!</div>
    );
};

export default Dynamic;
```

P.S. 더 좋은 UX를 위해 Preload 방식 추가
// 마우스 클릭하기 전에 마우스 커서가 올라가는 순간부터 로딩 시작


```
// App.js
import loadable from '@loadable/component';

const Dynamic = loadable(() => import('./dynamic'), {
    // Suspense fallback 역할
    fallback: <div>Loading...</div>
});

const [useDynamic, setUseDynamic] = useState(false);

const handleDynamic = () => {
    setUseDynamic(() => true);
};  

const onMouseOver = () => {
    Dynamic.preload();
};

return (
    <div onClick={handleDynamic} onMouseOver={onMouseOver}>Use Dynamic!!!</div>
    {useDynamic && <Dynamic/>}
);

// dynamic.js
const Dynamic = () => {
    return (
        <div>Preload Loadable Component Code!!!</div>
    );
};

export default Dynamic;
```

## DOMContentLoaded VS ComponentDidMount(feat.useEffect)
#### https://stackoverflow.com/questions/40104350/react-js-is-domcontentloaded-equal-with-componentdidmount

리액트 컴포넌트 내부에서 DOMContentLoaded 이벤트를 작성하면 작동되지 않는다.
이유 : DOMContentLoaded 이벤트는 전체 HTML 페이지가 로드되는 경우에만 발생한다. 반면에 ComponentDidMount는 React 컴포넌트가 렌더링 될 때 호출된다. 따라서, ComponentDidMount 이벤트가 호출될 때 DOM은 이미 'DOMContentLoaded' 상태이다.

## Error 모음
Unexpected Unicode - 퍼블리싱 작업파일 옮겨서 사용할 때 발생하는 에러 > 새로 js 파일 만들어서 내용 옮겨주면 사라짐
[리액트로 프로젝트 빌드 후 - React-Uncaught SyntaxError: Unexpected token <](https://yoon-dumbo.tistory.com/entry/Error-%EC%A0%95%EB%A6%AC-React-Uncaught-SyntaxError-Unexpected-token)