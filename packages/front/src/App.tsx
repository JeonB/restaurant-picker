/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import processData from './test';
const App: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await processData('한식');
      setQuery(result !== undefined ? result : null);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleClick = async () => {
    fetchData();
  };
  return (
    <div className="text-center">
      <Button label="Random" icon="pi pi-plus" onClick={handleClick}></Button>
      <div className="text-2xl text-900 mt-3">{query}</div>
    </div>
  );
};

export default App;
