import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import randomPick from './randomPick';
import GroupRadioButton from './radioButton';
export const RandomPicker = () => {
  const [info, setInfo] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');
  useEffect(() => {
    // fetchData(category);
  }, [category]);

  const fetchData = async (category: string) => {
    try {
      const result = await randomPick(category);
      setInfo(result !== undefined ? result : null);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleClick = async () => {
    fetchData(category);
  };
  const header = (
    <>
      <img
        alt="Card"
        src="https://primefaces.org/cdn/primereact/images/usercard.png"
      />
      <GroupRadioButton category={category} setCategory={setCategory} />
    </>
  );
  const footer = (
    <>
      <Button label="Random Pick" icon="pi pi-search" onClick={handleClick} />
      {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title="Advanced Card" // 음식점 데이터 들어가야됨
        subTitle="Card subtitle"
        footer={footer}
        header={header}
        className="md:w-25rem">
        <p className="m-0">{info}</p>
      </Card>
    </div>
  );
};
