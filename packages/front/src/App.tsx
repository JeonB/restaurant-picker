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
    fetchData(); // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
  }, []);

  const fetchData = async () => {
    try {
      const result = await processData('한식'); // 데이터를 가져옵니다.
      setQuery(result !== undefined ? result : null); // 데이터를 상태에 설정합니다.
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleClick = async () => {
    fetchData(); // 버튼이 클릭될 때 데이터를 다시 가져옵니다.
  };
  return (
    <div className="text-center">
      <Button label="Random" icon="pi pi-plus" onClick={handleClick}></Button>
      <div className="text-2xl text-900 mt-3">{query}</div>
    </div>
  );
};

export default App;
