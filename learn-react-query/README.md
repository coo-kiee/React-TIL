# React-Query

- npm i react-query

- npm i axios

## React-Query가 2번 렌더링하는 이유

백그라운드에서 쿼리를 자동으로 갱신하기 때문에 2번 렌더링 한다.
1. 새로운 쿼리 인스턴스가 발동/시작 될 때,
2. 윈도우가 다시 포커싱 될때(개발자도구도 포커싱 아웃으로 인식)
3. 네트워크가 재연결 될 때
4. 쿼리가 refetch interval 정의에 의해 구성될 때
#### https://hyesech.postype.com/post/10986706

추가 참조
#### https://seung00.tistory.com/56

## Optimistic Update 낙관적 업데이트
#### https://velog.io/@raverana96/react-query-Optimistic-Update
#### https://velog.io/@sv002/%EC%A2%8B%EC%95%84%EC%9A%94-%EA%B8%B0%EB%8A%A5-react-query-optimistic-update
서버를 업데이트 하기 전에 미리 화면의 UI를 바꿔준 후, 서버와의 통신 결과에 따라 확정 롤백을 결정하는 방식

## Mutation
#### https://tkdodo.eu/blog/mastering-mutations-in-react-query
