import React, { useEffect, useMemo, useState } from 'react';
import './product.css';
import { Publish } from '@mui/icons-material';
import Chart from '../../components/chart/Chart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userRequest } from '../../requestMethods';
import { ProductType } from '../../redux/productRedux';
import ImgStorage from '../../firebaseStorage';
import FirebaseApp from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { async } from '@firebase/util';

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

  const [update, setUpdate] = useState<ProductType>({ inStock: false });
  const [downloadURL, setDownloadURL] = useState<string>();
  const product = useSelector((state: RootState) =>
    state.product.products.find((product) => product._id === productId)
  );

  const imgStorage = new ImgStorage(FirebaseApp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateProduct = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    if (e.target.name === 'inStock') {
      if (e.target.value === 'true') {
        setUpdate({
          ...update,
          [e.target.name]: true,
        });
      } else {
        setUpdate({
          ...update,
          [e.target.name]: false,
        });
      }
    } else {
      setUpdate({
        ...update,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target;
      if (target.files == null) {
        return;
      }
      const file = target.files[0];
      await imgStorage.uploadImg(file, setDownloadURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUpdate({ ...update, img: downloadURL });
  }, [downloadURL]);

  const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const result = await updateProduct(productId, update, dispatch);
      if (result?._id == null) {
        window.alert('Update Failed!!');
        navigate(`/products`);
      } else {
        window.alert('Update Success!!');
        navigate(`/product/${result?._id}`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
  };

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
            <img
              src={!downloadURL ? product?.img : downloadURL}
              alt=''
              className='productInfoImg'
            />
            <span className='productName'>
              {!update?.title ? product?.title : update?.title}
            </span>
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
                {!update?.inStock
                  ? product?.inStock
                    ? 'O'
                    : 'X'
                  : update?.inStock
                  ? 'O'
                  : 'X'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              onChange={handleUpdateProduct}
              name='title'
              type='text'
              placeholder={product?.title}
            />
            <label>Product Description</label>
            <input
              onChange={handleUpdateProduct}
              name='desc'
              type='text'
              placeholder={product?.desc}
            />
            <label>Price</label>
            <input
              onChange={handleUpdateProduct}
              name='price'
              type='text'
              defaultValue={product?.price}
            />
            <label>In Stock</label>
            <select onChange={handleUpdateProduct} name='inStock' id='idStock'>
              <option value='false'>No</option>
              <option value='true'>Yes</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img
                src={!downloadURL ? product?.img : downloadURL}
                alt=''
                className='productUploadImg'
              />
              <label htmlFor='file' style={{ cursor: 'pointer' }}>
                <Publish />
              </label>
              <input
                disabled={isUpdating}
                name='img'
                onChange={handleImgUpload}
                type='file'
                id='file'
                style={{ display: 'none', cursor: 'pointer' }}
              />
            </div>
            <button
              disabled={isUpdating}
              onClick={handleUpdate}
              className='productButton'
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
