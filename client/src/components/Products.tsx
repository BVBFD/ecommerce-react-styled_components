import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { publicRequest } from '../requestMethods';
import Product from './Product';

type ProductsProps = {
  cat?: string;
  filters?: object;
  sort?: string;
};

type ProductObjType = {
  categories: string[];
  color: string[];
  createdAt: number;
  desc: string;
  img: string;
  inStock: boolean;
  price: number;
  size: string[];
  title: string;
  updatedAt: number;
  _v: number;
  _id: string;
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Products = ({ cat, filters, sort }: ProductsProps) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `/products?category=${cat}` : `/products`
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters as Object).every(([key, value]) => {
            const filterValue: Array<string> = item[key];
            return filterValue.includes(value);
          })
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a: ProductObjType, b: ProductObjType): number =>
            a.createdAt - b.createdAt
        )
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a: ProductObjType, b: ProductObjType): number => a.price - b.price
        )
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a: ProductObjType, b: ProductObjType): number => b.price - a.price
        )
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item: ProductObjType) => (
            <Product item={item} key={item._id} />
          ))
        : products
            .slice(0, 8)
            .map((item: ProductObjType) => (
              <Product item={item} key={item._id} />
            ))}
    </Container>
  );
};

export default Products;
export type { ProductObjType };
