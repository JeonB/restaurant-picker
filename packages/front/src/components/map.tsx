import React, { useEffect } from 'react';
declare global {
  interface Window {
    kakao: any;
  }
}
export const MapComponent = () => {
  useEffect(() => {
    // 카카오맵 API 연동
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');

        // 중심좌표(위도, 경도), 확대 정도 설정
        const options = {
          center: new window.kakao.maps.LatLng(
            37.5676859104888,
            126.82597944995,
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 지도 타입 컨트롤, 줌 컨트롤 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT,
        );
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };
  }, []);

  return <div id="kakao-map" style={{ width: '100%', height: '400px' }} />;
};
