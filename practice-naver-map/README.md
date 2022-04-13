# practice-naver-map
작업하기전 index.html에 api script 추가 >> 해당 화면 body에 script 추가하는 방식으로 변경
#### http://daplus.net/javascript-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EA%B0%80%EB%A1%9C%EB%93%9C-%EB%90%9C-%ED%9B%84-%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C/
#### https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript

[Todos - customHooks 만들기(실패ing)](https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx)   
이 사이트를 참고하면 해결책이 보일듯 (https://rangen.medium.com/dynamically-load-google-scripts-with-react-and-the-useeffect-hook-3700b908e50f)

## Naver API Jquery To JS
[$.getScript](https://navermaps.github.io/maps.js.ncp/docs/tutorial-4-Submodules.html)   
`$.getScript > src/utils/getScript.js 로 구현`

## Error 모음
[맵 랜더링 오류: naver map annot read properties of null (reading 'style ~](https://ideveloper2.tistory.com/90)   
useEffect를 사용해서 마운트 후 map api 호출

[Geolocation PC 위치 오류](https://devtalk.kakao.com/t/topic/71972?source_topic_id=101154)   
모바일의 경우 자체 GPS가 있어서 gelocation API를 사용하는게 정확함, PC의 경우 정확하지 않기 때문에 카카오의 경우 IP 타겟팅 방식을 사용   
IP 타겟팅 방식이란? - 

[Warning - parser-blocking](https://studyingpingu.tistory.com/46)   
index.html에 script 추가 시 리소스 소모가 크기 때문에 스크립트 블락이 일어날 수 있다는 이야기 인것 같다. => 해결방법: 해당 페이지에서만 script를 호출하는 방식을 사용