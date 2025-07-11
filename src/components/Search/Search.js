import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { products } from '../../pages/Home/Home';
import '../../pages/Home/Home.css' 
import { formatPrice } from '../../pages/Home/Home';
import { useCart } from '../../context/CartContext';
import Carousel from '../Carousel/Carousel';

const Search = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState(products);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [priceFilter, setPriceFilter] = useState('all');
    const handleSearch = (e) => {
      const keyword = e.target.value;
      setSearch(keyword);
  
      const filtered = products.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
  
      setData(filtered);
      console.log(filtered);
    };

    const handlePriceFilterChange = (e) => {
      setPriceFilter(e.target.value);
    };
    
    // Kết hợp cả search và price filter
    const getFilteredProducts = () => {
      let filtered = products;
      
      // Filter theo search keyword
      if (search) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Filter theo price
      if (priceFilter === 'under500') {
        filtered = filtered.filter(item => item.price < 500000);
      } else if (priceFilter === '500to1000') {
        filtered = filtered.filter(item => item.price >= 500000 && item.price <= 1000000);
      } else if (priceFilter === 'over1000') {
        filtered = filtered.filter(item => item.price > 1000000);
      }
      
      return filtered;
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    };
        const filteredProducts = getFilteredProducts();

    return (
      <div className="porduct-box">
        <div className="search-container">
        <Carousel />

            <div className="search">
                <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={handleSearch}
                />
            </div>
            <div className="price-filter">
                <select value={priceFilter} onChange={handlePriceFilterChange}>
                    <option value="all">Tất cả</option>
                    <option value="under500">Dưới 500.000</option>
                    <option value="500to1000">500.000 - 1.000.000</option>
                    <option value="over1000">Trên 1.000.000</option>
                </select>
            </div>
        </div>
        
        
        <div className="products-grid">
            {filteredProducts.map(item => (
                <div key={item.id} className="product-card">
                    <div className="product-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">{formatPrice(item.price)}</p>
                        <p className="product-description">{item.description}</p>
                        <div className="product-button">
                        <button className="view-details-btn" onClick={() => handleAddToCart(item)}>
                            Thêm vào giỏ hàng
                        </button>
                        <button 
                            className="view-details-btn"
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            Xem chi tiết
                        </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Search;