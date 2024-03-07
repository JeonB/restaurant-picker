import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import randomPick from './randomPick';
import GroupRadioButton from './radioButton';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantInfo from './dataView';
interface Restaurant {
  id: number;
  place_name: string;
  category_name: string;
  distance: number;
  phone: string;
  place_url: string;
  created_at: string;
  updated_at: string;
}

export const RandomPicker = () => {
  const [info, setInfo] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string>('');
  useEffect(() => {
    // fetchData(category);
    console.log('외않되' + JSON.stringify(info));
  }, [category, info]);

  const fetchData = async (category: string) => {
    try {
      const result = await randomPick(category);
      console.log('테스트:' + JSON.stringify(result));
      setInfo(result !== undefined ? [result] : []);
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
      <Button
        label="Random Pick"
        icon={<FastfoodIcon />}
        onClick={handleClick}
        style={{ gap: '13px' }}
      />
      {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={info.length > 0 ? info[0].place_name : 'No Data'} // 음식점 데이터 들어가야됨
        subTitle={info.length > 0 ? info[0].category_name : 'No Data'}
        footer={footer}
        header={header}
        style={{ width: 600, alignItems: 'center' }}>
        <RestaurantInfo info={info} />
        {/* <p className="m-0">{info}</p> */}
      </Card>
    </div>
  );
};
