import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Publish } from '@mui/icons-material';
import Chart from '../../components/chart/Chart';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../requestMethods';

type ResProductType = {
  _id: number;
  total: number;
};

type PStatsType = {
  name: string;
  Sales: number;
};

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [pStats, setPStats] = useState<PStatsType[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);

  const product = useSelector((state: RootState) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/income?pid=${productId}`);
        const list: ResProductType[] = res.data.sort(
          (a: ResProductType, b: ResProductType) => {
            return a._id - b._id;
          }
        );

        list.map((item: ResProductType) => {
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  useEffect(() => {
    let totalSales = 0;
    pStats.forEach((pStat) => {
      totalSales = totalSales + pStat.Sales;
    });

    setTotalSales(totalSales);
  }, [pStats]);

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
            data={pStats as PStatsType[]}
            dataKey='Sales'
            title='Sales Performance'
          />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product?.img} alt='' className='productInfoImg' />
            <span className='productName'>{product?.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{product?._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>sales:</span>
              <span className='productInfoValue'>{totalSales}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>in stock:</span>
              <span className='productInfoValue'>
                {product?.inStock ? 'O' : 'X'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input type='text' placeholder={product?.title} />
            <label>Product Description</label>
            <input type='text' placeholder={product?.desc} />
            <label>Price</label>
            <input type='text' defaultValue={product?.price} />
            <label>In Stock</label>
            <select name='inStock' id='idStock'>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product?.img} alt='' className='productUploadImg' />
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
