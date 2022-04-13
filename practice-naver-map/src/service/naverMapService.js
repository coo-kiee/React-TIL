const { naver } = window;

let map;

const setMap = (mapObj) => {
    map = mapObj;
};

const getMap = () => {
    return map;
}

const initMap = (naver) => {

    // 모바일의 경우 단말의 GPS가 있기 때문에 위치가 정확함, PC의 경우 geolocation 위치가 정확하지 않음 - 카카오의 경우 IP 타겟팅 사용
    navigator.geolocation.getCurrentPosition((posion) => successGetPositon(posion, naver));
};

const successGetPositon = async (positon, naver) => {

    const currentPosition = new naver.maps.LatLng(positon.coords.latitude, positon.coords.longitude);

    const mapOptions = {
        center: currentPosition,
        zoom: 17,
    };

    const map = new naver.maps.Map('map', mapOptions);

    // naverMapService.setMap(map);
    // naverMapService.initGeocoder();

    // 지도에 마커 표시
    let marker = new naver.maps.Marker({
        position: currentPosition,
        map: map,
    });

    // 지도에 인포윈도우 표시
    let infowindow = new naver.maps.InfoWindow();
    infowindow.setContent('<div style="padding:20px;">현재 위치 </div>');
    infowindow.open(map, currentPosition);

};

const initGeocoder = () => {

    console.log(map);
    console.log('실행');
    map.addListener('click', (e) => {
        searchCoordinateToAddress(e.coord);
    });

    naver.maps.Event.addListener()
    map.getElementById('address').addEventListener('keydown', (e) => {
        var keyCode = e.which;

        if (keyCode === 13) { // Enter Key
            searchAddressToCoordinate(map.getElementById('address').value());
        }
    });

    map.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        searchAddressToCoordinate(map.getElementById('address').value());
    });

    searchAddressToCoordinate('정자동 178-1');

};

// 좌표 >> 주소 변환
const searchCoordinateToAddress = (infoWindow, latlng) => {

    naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            if (!latlng) {
                return alert('ReverseGeocode Error, Please check latlng');
            }
            if (latlng.toString) {
                return alert('ReverseGeocode Error, latlng:' + latlng.toString());
            }
            if (latlng.x && latlng.y) {
                return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
            }
            return alert('ReverseGeocode Error, Please check latlng');
        }

        var address = response.v2.address,
            htmlAddresses = [];

        if (address.jibunAddress !== '') {
            htmlAddresses.push('[지번 주소] ' + address.jibunAddress);
        }

        if (address.roadAddress !== '') {
            htmlAddresses.push('[도로명 주소] ' + address.roadAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        infoWindow.open(map, latlng);
    });
};

// 주소 >> 좌표 변환
const searchAddressToCoordinate = (infoWindow, address) => {

    naver.maps.Service.geocode({
        query: address
    }, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            if (!address) {
                return alert('Geocode Error, Please check address');
            }
            return alert('Geocode Error, address:' + address);
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('No result.');
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        map.setCenter(point);
        infoWindow.open(map, point);
    });
};


const naverMapService = {
    getMap,
    setMap,
    initMap,
    initGeocoder,
    searchAddressToCoordinate,
    searchCoordinateToAddress,
}

export default naverMapService;