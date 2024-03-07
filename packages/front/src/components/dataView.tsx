import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Restaurant {
  id: number;
  place_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_url: string;
  created_at: string;
  updated_at: string;
}

export default function RestaurantInfo({
  info,
}: {
  info: Restaurant[] | undefined;
}) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
      <DataTable value={info} style={{ width: 360 }}>
        {/* <Column
          field="place_name"
          header="PlaceName"
          style={{ width: 10 }}></Column> */}
        {/* <Column
          field="category_name"
          header="CategoryName"
          style={{ width: 10, alignContent: 'center' }}></Column> */}
        <Column
          field="distance"
          header="Distance(meter)"
          style={{
            width: 10,
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
        <Column
          field="phone"
          header="Phone"
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  );
}
