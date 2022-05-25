# TypeScript
#### https://www.typescriptlang.org/ko/docs/handbook/2/basic-types.html
#### https://yozm.wishket.com/magazine/detail/1376/

TypeScript 공식문서를 인용하면 '타입'이란 어떤 값이 함수의 인자로 전달될 수 있고, 어떤 값은 실행에 실패할 것이라는 것을 설명하는 개념이다.

JavaScript는 오직 동적 타입만을 제공하기 때문에 일반적으로 런타임 코드가 실행 될 때 변수의 값과 타입을 확인한다.
typeof 연산자를 사용하면 각 값들의타입을 실행 시점에 알 수 있으나, 함수값의 경우 실행 시점에 어떤 타입이 반환될지 알 수 없다.

TypeScript의 목적은 정적 타입 시스템을 사용하여 코드가 실행되기 전에 코드에 대하여 예측하는 것이다.

타입스크립트를 사용하면 유용한 점은
1. 오타 확인
2. 호출되지 않은 함수 확인
3. 기본적인 논리 오류

대부분의 IDE는 정적 타입 검사기인 TypeScript Compiler(TSC)를 지원한다.

기본 선언 방법
```
// 변수, 함수 타입 선언
const a: string = "test";
const fn1: React.ChangeEventHandler<HTMLInputElement> = (e): void => {

};

// 함수 리턴값 타입 선언 1
const fn2 = <string>(msg) => {
    const response = "입력 값은" + msg + "입니다.";
    return response;
};

// 함수 리턴값 타입 선언 2
const fn2 = (msg): string => {
    const response = "입력 값은" + msg + "입니다.";
    return response;
};
```

일반적으로 TypeScript는 올바른 타입을 잘 알아낼 수 있기 때문에 명시적인 타입을 항상 표기할 필요는 없다.
```
ex.
let msg = "hello";
// let msg: string = "hello"; 로 적지 않아도 된다.
// Tip: 마우스 hover시 타입이 나타나는 경우 명시하지 않아도 된다.
```

## 설치
npm i -g typescript // React 등 다른 프레임워크는 설치 방법이 다름

## type과 interface 비교
#### https://jungpaeng.tistory.com/99

## TypeScript Spread type
#### https://bobbyhadz.com/blog/typescript-spread-types-may-only-be-created-from-object-types

## 중첩 된 객체에 대한 인터페이스 정의
#### http://daplus.net/typescript-typescript-%EC%A4%91%EC%B2%A9-%EB%90%9C-%EA%B0%9C%EC%B2%B4%EC%97%90-%EB%8C%80%ED%95%9C-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A5%BC-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A0%95/

## is와 as의 차이
#### https://velog.io/@dltjdwls100/TIL-Typescript-is%EC%99%80-as-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
as: 타입 단언/표명
is: 타입 가드

### 타입 표명(Type Assertion)
[타입 표명 && 이중 표명](https://radlohead.gitbook.io/typescript-deep-dive/type-system/type-assertion#as-foo-vs.-less-than-foo-greater-than)

굳이 개발자가 타입 지정을 하지 않아도 TS 컴파일러가 추론이 가능한 타입 추론 기능

2가지 타입 단언 방식
1. <Animal> foo // 런타임, 컴파일 단계 모두 돌아간다.
2. (foo as Animal) // 컴파일 단계에만 돌아간다.
※ 리액트로 개발할 시 꺽쇠(<>)를 사용 하는 것은 TSX 태그 문법이랑 헷갈리기 때문에 as를 추천한다.
※ 이중 표명 

### 타입 가드(Type Guard)
[타입 가드](https://radlohead.gitbook.io/typescript-deep-dive/type-system/typeguard)
typeof/instanceof 로 타입을 따져서 분기 처리하는 역할을 한다.

TypeScript에서 if문으로 타입을 좁혀내면 else문 안의 변수타입은 if문으로 좁혀낸 타입이 될 수 없음을 인지합니다.