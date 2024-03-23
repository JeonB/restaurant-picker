/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import { RandomPicker } from './components/randomPicker';
import { MapComponent } from './components/map';
import CurrentPosition from './components/currentPosition';

const App: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="text-center">
      <RandomPicker />
      <MapComponent />
    </div>
  );
};

export default App;
