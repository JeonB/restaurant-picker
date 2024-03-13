import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Restaurant } from 'src/types/Restaurant';
import { Button } from 'primereact/button';
import {
  CallOutlined,
  DirectionsRunOutlined,
  Fastfood,
  Phone,
  SmsOutlined,
} from '@mui/icons-material';

export default function RestaurantInfo({
  info,
}: {
  info: Restaurant[] | undefined;
}) {
  const handleIconClick = (rowData: Restaurant) => {
    window.open(rowData.place_url, '_blank');
  };

  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
      <DataTable value={info} style={{ width: '100%', height: 'auto' }}>
        <Column
          field="place_url"
          header={
            <>
              <SmsOutlined /> 상세 정보
            </>
          }
          style={{
            padding: '0.5rem',
            width: '30%',
            height: 'auto',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}
          body={rowData => (
            <Button
              label="Details"
              icon={<Fastfood />}
              onClick={() => handleIconClick(rowData)}
              style={{
                gap: '13px',
                backgroundImage:
                  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
              }}
            />
          )}></Column>
        <Column
          field="distance"
          header={
            <>
              <DirectionsRunOutlined /> 거리
            </>
          }
          style={{
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
        <Column
          field="phone"
          header={
            <>
              <CallOutlined /> 전화번호
            </>
          }
          style={{
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  );
}
