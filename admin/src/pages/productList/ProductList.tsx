import React, { useEffect, useState } from 'react';
import './productList.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { productRows } from '../../dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCalls';
import { RootState } from '../../redux/store';
import { checkMmTk, isMnTk } from '../../module/checkMmTk';
import { mmTk } from '../product/Product';

const ProductList = ({ mmTk }: mmTk) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [mmTkResult, setMnTkResult] = useState<boolean>(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    isMnTk(mmTk, setMnTkResult);
  }, [mmTk]);

  const handleDelete = (id: string) => {
    deleteProduct(id, dispatch);
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 220 },
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
    { field: 'inStock', headerName: 'Stock', width: 200 },
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
            <Link to={'/product/' + params.row._id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='productListDelete'
              onClick={() => mmTkResult && handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='productList'>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={14}
        checkboxSelection
      />
      <Link to='/newProduct'>
        <button className='uploadProduct'>Upload New Product</button>
      </Link>
    </div>
  );
};

export default ProductList;
