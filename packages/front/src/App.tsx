/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import { RandomPicker } from './components/randomPicker';
import { MapComponent } from './components/map';
import CurrentPosition from './components/currentPosition';
import useKakaoLoader from './useKakaoLoader';

const App: React.FC = () => {
  useKakaoLoader();
  return (
    <div className="text-center">
      <RandomPicker />
      <MapComponent />
    </div>
  );
};

export default App;
