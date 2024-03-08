import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Restaurant } from 'src/types/Restaurant';

export default function RestaurantInfo({
  info,
}: {
  info: Restaurant[] | undefined;
}) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
      <DataTable value={info} style={{ width: 560 }}>
        <Column
          field="place_url"
          header="Place-URL"
          style={{
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}
          body={rowData => (
            <a
              href={rowData.place_url}
              target="_blank"
              rel="noopener noreferrer">
              {rowData.place_url}
            </a>
          )}></Column>
        <Column
          field="distance"
          header="Distance(meter)"
          style={{
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
        <Column
          field="phone"
          header="Phone"
          style={{
            padding: '0.5rem',
          }}
          alignHeader={'center'}
          bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
  );
}
