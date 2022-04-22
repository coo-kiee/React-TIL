# React-Query
#### https://www.js2uix.com/frontend/react-query-step1/
- npm i react-query

- npm i axios

- npm i react-router-dom

## React Query VS SWR
#### https://tech.madup.com/react-query-vs-swr/

## React Query에 TypeScript 적용
#### https://gusrb3164.github.io/web/2022/01/23/react-query-typescript/

## queryKey 관리
#### https://www.zigae.com/react-query-key/

## React-Query가 2번 렌더링하는 이유
#### https://hyesech.postype.com/post/10986706

백그라운드에서 쿼리를 자동으로 갱신하기 때문에 2번 렌더링 한다.
1. 새로운 쿼리 인스턴스가 발동/시작 될 때,
2. 윈도우가 다시 포커싱 될때(개발자도구도 포커싱 아웃으로 인식)
3. 네트워크가 재연결 될 때
4. 쿼리가 refetch interval 정의에 의해 구성될 때

추가 참조   
(https://seung00.tistory.com/56)

## Optimistic Update 낙관적 업데이트
#### https://velog.io/@raverana96/react-query-Optimistic-Update
#### https://velog.io/@sv002/%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5-react-query-optimistic-update
서버를 업데이트 하기 전에 미리 화면의 UI를 바꿔준 후, 서버와의 통신 결과에 따라 확정 롤백을 결정하는 방식

## Mutation
#### https://react-query.tanstack.com/examples/optimistic-updates
#### https://tkdodo.eu/blog/mastering-mutations-in-react-query
#### https://velog.io/@elin_me/React-Query-%EB%8F%84%EC%9E%85%EA%B8%B0

공식문서의 낙관적 업데이트 Mutation 예제 이용해서 Custom Mutation Hooks 만들기
보완점 :
1. Custom Axios Hooks 사용하면 에러 발생 원인 파악 >> Config - Header에 Accept 설정
```
'Accept': "application/json, text/plain, */*"
```
2. Custom Mutation Hooks 인자 리팩토링 필요

 [P.S. Mutation Custom Hook](https://velog.io/@kimhyo_0218/React-Query-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BF%BC%EB%A6%AC-useMutation-%EC%8B%A4%EC%9A%A9-%ED%8E%B8custom-hook-%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90#%EA%B8%B0%EB%B3%B8-%ED%98%95%ED%83%9C%EC%9D%98-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%9B%852)

## QueryClient Default Options
QueryClient Default 되어있는 Options을 알아두고 나중에 커스터마이징 할 때 수정할 부분을 알아둔다.
```
enabled: false // 쿼리 자동 시작 방지 (Dependent Queries - 해당 의존성 변수 존재하면 쿼리 실행하지 않음)
ex) enabled: !!variable - (https://react-query.tanstack.com/guides/dependent-queries)

retry: 3 // 쿼리 실패시 재시도 횟수(false - 재시도 안함, true - 무한 재시도)

retryOnMount: true // 컴포넌트 마운트 후 Error일때 재시도 (false - 재시도 안함)

staleTime: 0 // 정해진 시간 지나면 오래된 데이터로 간주하고 refetch(Infinity - 데이터가 refetch 되지 않음)

cacheTime: 5 * 60 * 1000 // 정해진 시간이 지나면 캐시 가비지 컬렉터로 삭제(Infinity 캐시 삭제되지 않음)

refetchOnMount: true // 컴포넌트가 마운트 되고, 데이터가 stale 상태면 refetch(false - refetch 되지 않음, always - stale 상관없이 refetch)

refetchOnWindowFocus: true // 브라우저 창이 포커싱 되고, 데이터가 stale 상태면 refetch((false - refetch 되지 않음, always - stale 상관없이 refetch)

refetchOnReconnect: true // 브라우저가 재연결 되고, 데이터가 stale 상태면 refetch(false - refetch 되지 않음, always - stale 상관없이 refetch)
```

## Pagination
#### https://react-query.tanstack.com/examples/pagination

## stalteTime, cacheTime
#### https://velog.io/@yrnana/React-Query%EC%97%90%EC%84%9C-staleTime%EA%B3%BC-cacheTime%EC%9D%98-%EC%B0%A8%EC%9D%B4

## 의문점
features/clientState와 features/example이 마운트 된 후 console.log를 찍어보면 store에 저장 되는 속도에 차이가 있다.
이에 대한 조치가 필요하지는 않을까?

## 시도
정적 Promise.resolve 메소드를 사용하면 react-query로 client-state를 전역관리 할 수 있지 않을까?   
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve   
결론: 실패!!! - react-query store에 담는건 성공했지만 이벤트핸들러 안에 useQuery가 담기지 않는다.(Hook의 규칙 위반)   
(https://ko.reactjs.org/docs/hooks-rules.html)
[P.S. localStorage 이용한 전역관리](https://daily-dev-tips.com/posts/react-query-as-a-persistent-state-manager/)

## Error
### Error: Missing queryFn   
이유 : - 인자(argument)로 함수를 전달해야하는데 함수를 실행하기 때문이다.
```
useQuery("item", getItem) - O   
useQuery("item", getItem(id)) - X
```

해결방법 : 화살표 함수로 인자를 전달   
ES6: useQuery("item" ,(id) => getItem(id)   
(https://stackoverflow.com/questions/70319827/missing-queryfn-error-when-using-usequery)   
ES5: wrapperFn으로 getItem 함수를 감싸야한다. useQuery("item", wrapperFn(id, getItem)) - wrapperFn 내부에서 getItem(id) 실행!!   
(http://daplus.net/javascript-javascript-%ED%95%A8%EC%88%98%EB%A5%BC-%EB%A7%A4%EA%B0%9C-%EB%B3%80%EC%88%98%EB%A1%9C-%EC%A0%84%EB%8B%AC/)

### 'useMutate' is not defined  no-undef
Custom Hook으로 useMutate를 만들었는데 is not defined가 나왔다.

이유: Custom Hooks 잘못된 선언
```
// 잘못된 선언
export default useMutate = () => {};
```

해결방법 - 
```
// 방법 1
export const useMutate = () => {};
But, import 할 때 이렇게 사용 - import { useMutate } from "../../utills/useMutate");

// 방법 2
useMutate = () => {};
export default useMutate;
import 할 때 이렇게 사용 - import useMutate from "../../utills/useMutate");
```

### Next.Js SSR 개발시 발생한 문제점
https://codesandbox.io/s/goofy-swirles-xzpir?file=/pages/_app.js <<< 이 코드에서 문제점 발생   
- App 컴포넌트 내부에서 QueryClient 생성해서 쿼리가 저장되지 않는 현상 발생

App 컴포넌트 외부에 QueryClient 생성시 기존 사용자의 정보가 다른 사용자에게 사용될 수 있다.   
때문에 App 컴포넌트 내부에 QueryClient 객체를 생성하고 useRef를 사용해서 재생성 조건을 구성한다.   
https://github.com/tannerlinsley/react-query/issues/2072   
https://github.com/tannerlinsley/react-query/commit/862bb2be3a7c6161b70a2310f4661859adb6d943?diff=split

의문점: Next.JS가 아니어도 발생할 문제이지 않을까?? 때문에 App.js 코드를 useRef를 사용하도록 변경!

P.S.   
https://stackoverflow.com/questions/67126550/react-query-cache-doesnt-persist-on-page-refresh   
쿼리로 영속성을 유지하려면 local storage를 이용한다. (react-query에서는 persistQueryClient plugin을 사용한다.)   
하지만 이는 다른 사람이 해당 컴퓨터를 사용하면 데이터를 볼 수 있기 때문에 암호화가 필요하다.   
이를 위해서 Crypto API를 사용한다.   
[P.S. localStorage 이용한 전역관리](https://daily-dev-tips.com/posts/react-query-as-a-persistent-state-manager/)