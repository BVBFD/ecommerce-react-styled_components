import React, { ReactEventHandler, useState } from 'react';
import './newProduct.css';

type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | '';
type CatType = ['women' | 'man', string];

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [size, setSize] = useState<SizeType[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [cat, setCat] = useState<string[]>([]);
  const [stock, setStock] = useState<boolean>();

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

      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCat(e.target.value.split(','));
  };

  console.log(inputs);
  console.log(file);
  console.log(cat);

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
            placeholder='women,man,shirt,dress...'
          />
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select onChange={handleChange} name='inStock'>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button className='addProductButton'>Create</button>
      </form>
    </div>
  );
};

export default NewProduct;
