import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

export const MapComponent = () => {
  const [myLoca, setMyLoca] = useState({
    lat: 37.5676859104888,
    lng: 126.82597944995,
  }); // 현재위치 객체 값 설정
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어온다
      navigator.geolocation.getCurrentPosition(
        position => {
          setMyLoca({
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          });
        },
        err => {
          alert('현재 위치를 표시할 수 없어요');
        },
        { enableHighAccuracy: true }, // 위치정보의 정확도를 높이는 옵션
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때
      alert('현재 위치를 표시할 수 없어요');
    }
  }, []);

  return (
    <Map
      center={myLoca}
      level={3}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};
