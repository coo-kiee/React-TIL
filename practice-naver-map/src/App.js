import { useEffect, useRef, useState } from "react";
import getScript from "./utils/getScript";
import naverMapService from "./service/naverMapService";

function App() {

  const [naver, setNaver] = useState();
  // const mapRef = useRef();

  // 페이지가 렌더링 되기 전에 Naver Map API가 먼저 실행되서 map을 찾을 수 없다는 오류가 발생
  // 해결책: useEffect를 사용해서 마운트 시 initMap 함수 호출을 한다.
  useEffect(() => {

    const getNaverMap = async () => {

      try {

        // 네이버 지도 API 비동기 호출
        await getScript("https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=my4y6x6w9j&submodules=geocoder");

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

  // submodules=geocoder Test
  if (naver?.maps.TransCoord) {
    
    var latlng = new naver.maps.LatLng(37.5666103, 126.9783882); // 서울시청 위/경도 좌표
    var utmk = new naver.maps.TransCoord.fromLatLngToUTMK(latlng); // 위/경도 -> UTMK
    console.log(utmk);
  };

  return (
    // style도 객체로 선언하지 않으면 지도가 나오지 않음
    <div id="map" style={{ width: "100%", height: "400px" }} ></div>
  );
}

export default App;
