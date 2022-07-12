import React, { useState } from 'react';
import './newProduct.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import FirebaseApp from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

const NewProduct = () => {
  const [inputs, setInputs] = useState({ inStock: true });
  const [file, setFile] = useState<File>();
  const [cat, setCat] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const dispatch = useDispatch();

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
    setCat(e.target.value.split(','));
  };

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);

    if (!file) {
      return;
    }

    const fileName = new Date().getTime() + file!.name;
    const storage = getStorage(FirebaseApp);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file!);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        window.alert(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
          };
          console.log(product);
          // @ts-ignore
          addProduct(product, dispatch);
          setIsFetching(false);
        });
      }
    );
  };

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            onChange={(e) => {
              if (e.target.files == null) {
                return;
              }
              return setFile(e.target.files[0]);
            }}
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
