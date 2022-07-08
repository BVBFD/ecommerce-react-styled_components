import React, { useState } from 'react';
import './productList.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { productRows } from '../../dummyData';

const ProductList = () => {
  const [data, setData] = useState(productRows);

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.img} alt='' />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'stock', headerName: 'Stock', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='productListDelete'
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default ProductList;
