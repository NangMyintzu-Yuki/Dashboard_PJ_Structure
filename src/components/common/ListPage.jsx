import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Search from './Search';
import Button from './Button';




const ListPage = ({ rows, columns,currentRowsPerPage,onAction }) =>{
  return (
    <div className="listPage">
      <div className="listHeader">
        <Search />
        <Button type="create_new" label="Create" onAction={onAction} />
      </div>
      <div className="listing">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: currentRowsPerPage },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20,]}
            checkboxSelection={false}
          />
      </div>
    </div>
  )
}

export default ListPage
