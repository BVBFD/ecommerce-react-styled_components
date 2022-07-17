import React, { useEffect, useState } from 'react';
import './newProduct.css';
import FirebaseApp from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import ImgStorage from '../../firebaseStorage';
import { useNavigate } from 'react-router-dom';
import { mmTk } from '../product/Product';
import { isMnTk } from '../../module/checkMmTk';
import { ProductType } from '../../redux/productRedux';

const NewProduct = ({ mmTk }: mmTk) => {
  const [inputs, setInputs] = useState({ inStock: true });
  // const [file, setFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState<string>();
  const [cat, setCat] = useState<ProductType['categories']>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [mmTkResult, setMnTkResult] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgStorage = new ImgStorage(FirebaseApp);

  useEffect(() => {
    isMnTk(mmTk, setMnTkResult);
  }, [mmTk]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs((prev) => {
      if (e.target.name === 'color') {
        return { ...prev, [e.target.name]: e.target.value.split(',') };
      }

      if (e.target.name === 'size') {
        return { ...prev, [e.target.name]: e.target.value.split(',') };
      }

      if (e.target.name === 'price') {
        return { ...prev, [e.target.name]: parseInt(e.target.value) };
      }

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCat(e.target.value.split(',') as ProductType['categories']);
  };

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);

    // if (!mmTkResult) {
    //   window.alert('Not Authenticated Admin!!');
    //   setIsFetching(false);
    //   return;
    // }

    // if (!downloadURL) {
    //   setIsFetching(false);
    //   return;
    // }

    const product: ProductType = {
      ...inputs,
      img: downloadURL,
      categories: cat,
    };

    try {
      const result = await addProduct(product, dispatch);
      navigate(`/product/${result._id}`);
    } catch (error) {
      window.alert(
        `You should put all infomation of new product or Only the admin can edit!!`
      );
    }

    setIsFetching(false);
  };

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            // @ts-ignore
            onChange={
              mmTkResult &&
              (async (e) => {
                if (e.target.files == null) {
                  return;
                }
                await imgStorage.uploadImg(e.target.files[0], setDownloadURL);
              })
            }
            type='file'
            id='file'
          />
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input
            onChange={handleChange}
            name='title'
            type='text'
            placeholder='Apple Airpods'
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input
            onChange={handleChange}
            name='desc'
            type='text'
            placeholder='description...'
          />
        </div>
        <div className='addProductItem'>
          <label>Size</label>
          <input
            onChange={handleChange}
            name='size'
            type='text'
            placeholder='XS,S,M,L,XL...'
          />
        </div>
        <div className='addProductItem'>
          <label>Color</label>
          <input
            onChange={handleChange}
            name='color'
            type='text'
            placeholder='yellow, red, gray, white...'
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input
            onChange={handleChange}
            name='price'
            type='number'
            placeholder='100'
          />
        </div>
        <div className='addProductItem'>
          <label>Categories</label>
          <input
            onChange={handleCat}
            type='text'
            placeholder='women,man(Mandatory One),shirt...'
          />
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select onChange={handleChange} name='inStock'>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button
          onClick={handleClick}
          className='addProductButton'
          disabled={isFetching}
        >
          {isFetching ? 'Uploading...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
