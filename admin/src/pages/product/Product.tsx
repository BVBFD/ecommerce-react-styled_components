import React, { useState } from 'react';
import './product.css';
import { Publish } from '@mui/icons-material';
import Chart from '../../components/chart/Chart';
import { Link } from 'react-router-dom';
import { productData, productRows } from '../../dummyData';

type ProductDataType = [
  {
    name: string;
    Sales: number;
  }
];

type ProductRowsType = {
  id: number;
  name: string;
  img: string;
  stock: number;
  status: string;
  price: string;
  desc?: string;
};

const Product = () => {
  const [product, setProduct] = useState<ProductRowsType>(productRows[0]);
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart
            data={productData as ProductDataType}
            dataKey='Sales'
            title='Sales Performance'
          />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.img} alt='' className='productInfoImg' />
            <span className='productName'>{product.name}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{product.id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>sales:</span>
              <span className='productInfoValue'>5123</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>in stock:</span>
              <span className='productInfoValue'>{product.stock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input type='text' placeholder={product.name} />
            <label>Product Description</label>
            <input type='text' placeholder={product?.desc} />
            <label>Price</label>
            <input type='text' placeholder={product.price} />
            <label>In Stock</label>
            <select name='inStock' id='idStock'>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product.img} alt='' className='productUploadImg' />
              <label htmlFor='file'>
                <Publish />
              </label>
              <input type='file' id='file' style={{ display: 'none' }} />
            </div>
            <button className='productButton'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
