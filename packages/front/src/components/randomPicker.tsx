import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import randomPick from './randomPick';
import GroupRadioButton from './radioButton';
import { Restaurant as Rest } from '@mui/icons-material';
import RestaurantInfo from './dataView';
import { Restaurant } from '../types/Restaurant';

export const RandomPicker = () => {
  const [info, setInfo] = useState<Restaurant[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {}, [category, info]);

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
      <img
        alt="Card"
        src="https://i.postimg.cc/rpJGytmg/image.png"
        style={{ width: '85%', height: 'auto' }}
      />
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
        title={info.length > 0 ? info[0].place_name : 'No Data'}
        subTitle={info.length > 0 ? info[0].category_name : 'No Data'}
        footer={footer}
        header={header}
        style={{ width: '500px', alignItems: 'center' }}>
        <RestaurantInfo info={info} />
      </Card>
    </div>
  );
};
