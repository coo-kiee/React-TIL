# JavaScript

## JQuery
기본문법   
(https://soft91.tistory.com/9)   

선택자   
(https://www.zerocho.com/category/jQuery/post/57a9a371e4bc011500624ba3)

## 옵셔널 체이닝(optional chaining) '?.'
#### https://ko.javascript.info/optional-chaining
?. - 앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환 // ?.는 존재하지 않아도 괜찮은 대상에만 사용해야 합니다.   
**ES6부터 추가**

## IE에서도 사용 가능한 이미지 다운로드 - feat a Tag
#### https://gracefullight.dev/2017/01/16/javascript%EB%A1%9C-%EB%A1%9C%EC%BB%AC%EC%97%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C/
#### https://blog.naver.com/PostView.nhn?blogId=okskmk2&logNo=221546158662&categoryNo=148&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView
P.S. 이미지 클릭하면 다운로드   
(https://alikong.tistory.com/12)

P.S. Blob 이해   
(https://heropy.blog/2019/02/28/blob/)   

a Tag download 속성 - IE, Edge, Safari, Opera 는 지원을 안한다   
(https://mine-it-record.tistory.com/445)

## a Tag rel 속성
#### http://www.tcpschool.com/html-tag-attrs/a-rel

## a Tag href="#", #none, javascript:void(0);
#### https://minimal-dev.tistory.com/28
a Tag 이동 기능 무력화

## ClassName()으로 Element요소를 가져올 때 유의점
#### https://moalgong.tistory.com/25

## 이미지 존재여부 확인
#### https://optionbox.tistory.com/175
#### https://www.fabiofranchino.com/log/load-an-image-with-javascript-using-await/

방법 1. new Image() && Promise
image 객체를 이용해서 onload, onerror에 따라 Promise 객체 반환
단점: 이미지를 로딩하기 때문에 많이 사용하면 성능 이슈 발생
보완: 썸네일 이미지 사용?
```
// 이미지 존재여부 확인
const findImage = (imageSrc) => {

    return new Promise(resolve => {
        const img = new Image()
        img.src = imageSrc
        img.onload = () => {
            resolve({ useImage: true });
        }
        img.onerror = e => {
            resolve({ useImage: false });
        }
    });
};

// 이미지 사용가능 여부
const checkImage = async (calendarArr) => {

    // 이미지 존재여부 병렬 호출
    const responseArr = await Promise.all(calendarArr.map(item => DownloadService.findImage("/images/download/" + item.downloadFileDate + donwloadInfos[2].imgPath)));

    const calendarData = responseArr.map( (response, idx) => ({...calendarArr[idx], useImage: response.useImage}));
    setCalendar(prev => calendarData);
};
```

방법 2. Axios
```
// 이미지 존재여부 확인
const findImage = (imageSrc) => {

    return useAxios.get("/images/download2/" + imageSrc)
    .then(res => ({useImage: true}))
    .catch(e => ({useImage: false}));

};

// 이미지 존재여부 병렬 호출
const response = await Promise.all(calendarInfos.map(item => DownloadService.findImage(item.thumNailSrc)));
const calendarData = response.map( (resObj, idx) => ({...calendarInfos[idx], useImage:resObj.useImage}));  


```

방법 3. require   
나의 경우 클라이언트 서버에 이미지 파일이 있었기 때문에 이미지 파일이 있는지만 파악하기 위해서 require를 사용했다.
```
// 이미지 존재여부 확인
const findImage = (imageSrc) => {

    try {
        const test = require("../../public/images/download2/" + imageSrc);
        console.log(test);
        return {useImage: true};
    } catch (e) {
        console.log(e);
        return {useImage: false};
    };

};
```

## 이미지 lazy 로딩 - IntersectionObserver API
#### https://pks2974.medium.com/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3
#### https://been.tistory.com/25?category=517363

IntersectionObserver API는 많은 브라우저에서 지원하지는 않기 때문에
Polyfill 라이브러리와 함께 사용해야한다.

P.S. [커스텀훅으로 사용](https://ichi.pro/ko/reacteseo-jeomjinjeog-eulo-imijilodeu-18127722463610)