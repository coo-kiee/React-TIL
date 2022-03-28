# HTML

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