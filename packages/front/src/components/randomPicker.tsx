import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import randomPick from './randomPick';
import GroupRadioButton from './radioButton';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Restaurant as Rest } from '@mui/icons-material';
import RestaurantInfo from './dataView';
import { Restaurant } from '../types/Restaurant';

export const RandomPicker = () => {
  const [info, setInfo] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string>('');
  useEffect(() => {
    // fetchData(category);
    // console.log('데이터 확인: ' + JSON.stringify(info));
  }, [category, info]);

  const fetchData = async (category: string) => {
    try {
      const result = await randomPick(category);
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
      <img alt="Card" src="https://i.postimg.cc/rpJGytmg/image.png" />
      <GroupRadioButton category={category} setCategory={setCategory} />
    </>
  );
  const footer = (
    <>
      <Button
        label="Random Pick"
        icon={<Rest />}
        onClick={handleClick}
        style={{ gap: '13px' }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={info.length > 0 ? info[0].place_name : 'No Data'} // 음식점 데이터 들어가야됨
        subTitle={info.length > 0 ? info[0].category_name : 'No Data'}
        footer={footer}
        header={header}
        style={{ width: 650, alignItems: 'center' }}>
        <RestaurantInfo info={info} />
      </Card>
    </div>
  );
};
