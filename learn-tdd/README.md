# learn-tdd

## Ref
- [TDD의 소개](https://velog.io/@velopert/TDD%EC%9D%98-%EC%86%8C%EA%B0%9C)  
- [자바스크립트 테스팅의 기초](https://velog.io/@velopert/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8C%85%EC%9D%98-%EA%B8%B0%EC%B4%88)  
- [벨로퍼트와 함께하는 리액트 테스팅](https://velog.io/@velopert/react-testing)
- [Book - 스무디 한 잔 마시며 끝내는 리액트 + TDD](https://www.yes24.com/Product/Goods/102280451)

 ## 테스트 주도 개발 방법론이 나오게 된 이유
 - 소프트웨어를 개발 후 다른 사람이 작성한 소스 코드 또는 예전에 작성한 코드에 대해 테스트 코드 작성 시 코드를 분석해야 한다. (리소스 추가 소모)
 - 개발 된 소스 코드가 테스트하기 쉽게 작성되지 않았다. 이에 따라 기존 소스를 수정해야 하고, 이로 인한 예기치 않은 문제점이 발생할 수 있다. (리소스 추가 소모)

## 테스트 주도 개발 방법론
 - 실패하는 테스트 명세를 작성한다.
 - 실패를 통과하는 코드를 간단하고 빠르게 작성한다.
 - 작성한 코드를 리팩토링 한다.

## 필수 지식
- describe / Test : 테스트를 그룹화 하는 함수
- test / it : 단위 테스트 함수
- render : 컴포넌트 렌더링 함수
- screen : 렌더링 화면 접근 변수
- expect : 테스트 결과 예측 함수