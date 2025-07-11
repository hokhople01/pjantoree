import React from 'react';
import './Home.css';
import Search from '../../components/Search/Search';

export const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    price: 100000,
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1170&auto=format&fit=crop",
    description: "Sách 1"
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    price: 200000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1198&auto=format&fit=crop",
    description: "Sách 2"
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    price: 300000,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1129&auto=format&fit=crop",
    description: "Sách 3"
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    price: 600000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    description: "Sách 4"
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    price: 700000,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1074&auto=format&fit=crop",
    description: "Sách 5"
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    price: 1200000,
    image: "https://plus.unsplash.com/premium_photo-1683141243517-5730698ff67f?q=80&w=1074&auto=format&fit=crop",
    description: "Sách 6"
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const Home = () => {

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">Sản phẩm
        </h1>
        <Search />
      </div>
    </div>
  );
};

export default Home; 