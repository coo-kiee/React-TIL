# CSS

## Margin / Padding 차이
#### https://bangu4.tistory.com/25
Margin - Object 외부 여백
Padding Object 내부 여백

## SCSS
#### https://icecokel.tistory.com/20

SCSS는 중첩, 변수 선언, 연산자 등 css에 여러가지 기능이 추가됐다.
특히, 셀렉터 중첩기능을 이용해서 불필요한 중복 코드를 방지하고, css 코드량을 줄일 수 있고, 가독성을 높일 수 있다.

## CSS Preload
[잘못된 preload 사용 예](https://techstacker.com/css-preload-hint/)

페이지를 개발하는 도중 외부 CSS를 사용하면 페이지가 로딩되고 나서 CSS가 적용되는 모습이 UI 측면에서 좋지 않다고 생각해서
preload 기능을 사용했다.

하지만 생각외로 preload이 적용되지 않았고, 나에게는 경고 메세지만 보여졌다.
```
was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
```

이유가 무엇일까?

내가 했던 첫번째 방법은
css 파일을 불러온 것이다.
```
<link rel='preload' href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' as="style" onload="this.rel='stylesheet'">
```

하지만 CSS는 적용되지 않았다. 위 경로에 포함되어 있는 3가지 font를 사용하는데 여전히 페이지가 로딩된 후에 다운을 시작했다.

그래서 3가지 font를 preload 했다.
```
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2' as="font" type="font/woff2" crossorigin>
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2' as="font" type="font/woff2" crossorigin>
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2' as="font" type="font/woff2" crossorigin>
```

3가지 font가 미리 로드가 되었지만 but not used 경고가 발생하면서 적용되지 않았다.

그렇다면 css파일이 있어야 폰트가 적용되는게 아닐까?

마지막 방법을 사용해보았다.
```
<link rel='preload' href='https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' as="style" onload="this.rel='stylesheet'">
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2' as="font" type="font/woff2" crossorigin>
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2' as="font" type="font/woff2" crossorigin>
<link rel='preload' href='https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2' as="font" type="font/woff2" crossorigin>
```

css파일과 font 모두를 미리 로드한 후 css파일이 로드되면 stylesheet를 변경했더니 페이지가 로딩되면서 font가 잘 적용됐다.

[P.S. - 웹 폰트 로딩을 더 빠르게 하는 방법](https://yceffort.kr/2021/06/ways-to-faster-web-fonts)

## 리플로우/리페인트
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

**주의사항 - preload가 지원되지 않는 브라우저도 있기 때문에 일반 link tag도 추가해두어야 한다.**