import React from 'react';
import './featuredInfo.css';
import { useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { publicRequest, userRequest } from '../../requestMethods';

type IncomeType = {
  _id: number;
  total: number;
};

const FeaturedInfo = () => {
  const [income, setIncome] = useState<IncomeType[]>([]);
  const [lastIndex, setLastIndex] = useState<number>(0);

  const [sales, setSales] = useState<number>(0);
  const [salesPerc, setSalesPerc] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [costPerc, setCostPerc] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [prevRevenue, setPrevRevenue] = useState<number>(0);
  const [revenuePerc, setRevenuePerc] = useState<number>(0);

  const [taxRate, setTaxRate] = useState<number>(0);

  const calcTax = (total: number) => {
    if (total <= 50 && total > 0) {
      return 0.04;
    } else if (total <= 150 && total > 50) {
      return 0.05;
    } else if (total <= 250 && total > 150) {
      return 0.06;
    } else if (total <= 350 && total > 250) {
      return 0.07;
    } else if (total <= 550 && total > 350) {
      return 0.08;
    } else if (total <= 650 && total > 550) {
      return 0.09;
    } else if (total <= 750 && total > 650) {
      return 0.1;
    } else if (total <= 750 && total > 650) {
      return 0.11;
    } else if (total <= 850 && total > 750) {
      return 0.12;
    } else if (total <= 950 && total > 850) {
      return 0.13;
    } else if (total <= 1050 && total > 950) {
      return 0.14;
    } else if (total > 1050) {
      return 0.15;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get('/orders/income');
        setIncome(
          res.data.sort((a: IncomeType, b: IncomeType) => a._id - b._id)
        );
        setLastIndex(res.data.length - 1);
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  useEffect(() => {
    setSales(income[lastIndex]?.total);
    // prettier-ignore
    setSalesPerc(Math.floor((((income[lastIndex]?.total) - (income[lastIndex - 1]?.total)) / (income[lastIndex - 1]?.total)) * 100))
    // prettier-ignore
    setCost(Math.floor(income[lastIndex]?.total * calcTax(income[lastIndex]?.total)));
    // prettier-ignore
    setCostPerc(Math.floor((((income[lastIndex]?.total * calcTax(income[lastIndex]?.total)) - (income[lastIndex - 1]?.total * calcTax(income[lastIndex-1]?.total))) / (income[lastIndex - 1]?.total * calcTax(income[lastIndex-1]?.total))) * 100));
    // prettier-ignore
    setPrevRevenue((income[lastIndex - 1]?.total) - (income[lastIndex - 1]?.total * calcTax(income[lastIndex-1]?.total)))
  }, [income]);

  useEffect(() => {
    // prettier-ignore
    setRevenue(sales - cost);
    setRevenuePerc(Math.floor(((revenue - prevRevenue) / prevRevenue) * 100));
  }, [revenue, prevRevenue, income]);

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Revenue</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${revenue}</span>
          <span className='featuredMoneyRate'>
            {revenuePerc}%
            {revenuePerc >= 0 ? (
              <ArrowUpward className='featuredIcon' />
            ) : (
              <ArrowDownward className='featuredIcon negative' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${sales}</span>
          <span className='featuredMoneyRate'>
            {salesPerc}%
            {salesPerc >= 0 ? (
              <ArrowUpward className='featuredIcon' />
            ) : (
              <ArrowDownward className='featuredIcon negative' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Cost</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${cost}</span>
          <span className='featuredMoneyRate'>
            {costPerc}%
            {costPerc >= 0 ? (
              <ArrowUpward className='featuredIcon' />
            ) : (
              <ArrowDownward className='featuredIcon negative' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
