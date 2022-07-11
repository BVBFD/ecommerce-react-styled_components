import React, { useState } from 'react';
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
  const [cat, setCat] = useState<CatType>();
  const [stock, setStock] = useState<boolean>();

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input type='file' id='file' />
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input name='title' type='text' placeholder='Apple Airpods' />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input name='desc' type='text' placeholder='description...' />
        </div>
        <div className='addProductItem'>
          <label>Size</label>
          <input name='size' type='text' placeholder='XS,S,M,L,XL...' />
        </div>
        <div className='addProductItem'>
          <label>Color</label>
          <input
            name='color'
            type='text'
            placeholder='yellow, red, gray, white...'
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input name='price' type='number' placeholder='100' />
        </div>
        <div className='addProductItem'>
          <label>Categories</label>
          <input type='text' placeholder='women,man,shirt,dress...' />
        </div>
        <div className='addProductItem'>
          <label>Stock</label>
          <select name='inStock'>
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
