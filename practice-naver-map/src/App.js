import { useEffect } from "react";

const { naver } = window;

function App() {

  const initMap = async () => {
    
    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10
    };
    
    let map = null;
    map = new naver.maps.Map('map', mapOptions);

    let marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.71344096516783, 126.8666797982575),
      map: map
    });

  };
  

  // useEffect를 사용해서 마운트 시 initMap 함수 호출을 한다.
  // 페이지가 렌더링 되기 전에 Naver Map API가 먼저 실행되서 map을 찾을 수 없다는 오류가 발생
  useEffect(() => {

    initMap();

  },[]);

  return (
      // style도 객체로 선언하지 않으면 지도가 나오지 않음
      <div id="map" style={{width: "100%", height: "400px"}} ></div>
  );
}

export default App;
