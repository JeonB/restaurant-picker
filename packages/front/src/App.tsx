/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { RandomPicker } from './components/randomPicker';
const App: React.FC = () => {
  return (
    <div className="text-center">
      <RandomPicker />
    </div>
  );
};

export default App;
