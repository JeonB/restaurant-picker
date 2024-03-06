/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { RandomPicker } from './components/randomPicker';

const App: React.FC = () => {
  return (
    <div className="text-center">
      <FastfoodIcon />
      <RandomPicker />
    </div>
  );
};

export default App;
