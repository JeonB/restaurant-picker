/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import { RandomPicker } from './components/randomPicker';
import { MapComponent } from './components/map';

const App: React.FC = () => {
  return (
    <div className="text-center">
      <RandomPicker />
      <MapComponent />
    </div>
  );
};

export default App;
