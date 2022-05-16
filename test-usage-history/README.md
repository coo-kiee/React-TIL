# test-usage-history

## CRA migrate to TypeScript(CRA에 TypeScript 적용)
#### https://kyounghwan01.github.io/blog/TS/React/convert-js-to-ts/
TypeScript 추가
- npm i typescript @types/node @types/react @types/react-dom @types/jest

tsconfig 파일 생성
- npx tsc ==init

## TypseScript 적용 에러

[Cannot use JSX unless the '--jsx' flag is provided.ts(17004) 해결](https://steadily-worked.tistory.com/632)
P.S. 나의 경우 tsconfig.json 파일에서 아래 부분을 주석 해제해서 수정했다.
`
"jsx": "preserve",                                /* Specify what JSX code is generated. */
`