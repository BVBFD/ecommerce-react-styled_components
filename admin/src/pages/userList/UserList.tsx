import React, { useEffect, useState } from 'react';
import './userList.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userRequest } from '../../requestMethods';
import { UserType } from '../../redux/userRedux';

const UserList = () => {
  const [data, setData] = useState<UserType[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/users');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item._id !== id));
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'username',
      headerName: 'User',
      width: 120,
      renderCell: (params) => {
        return <div className='userListUser'>{params.row.username}</div>;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Resitered',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row._id}`}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='userListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <Link to='/newUser'>
        <button className='uploadUser'>Upload New User</button>
      </Link>
    </div>
  );
};

export default UserList;
