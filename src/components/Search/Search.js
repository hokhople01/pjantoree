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
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [priceFilter, setPriceFilter] = useState('all');
    const handleInputChange = (e) => {
      setSearch(e.target.value);
    };

    const handleSearch = () => {
      setIsSearchActive(true);
      const filtered = products.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
  
      setData(filtered);
      console.log(filtered);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const handlePriceFilterChange = (e) => {
      setPriceFilter(e.target.value);
    };
    
    const getFilteredProducts = () => {
      let filtered = isSearchActive ? data : products;
      
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
          <div className="search">
                  <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={search}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  />
                  <button className="search-btn" onClick={handleSearch}>
                    🔍
                  </button>
              </div>
              
          </div>
        <Carousel />
        <div className="price-filter">
                  <select value={priceFilter} onChange={handlePriceFilterChange}>
                      <option value="all">Tất cả</option>
                      <option value="under500">Dưới 500.000</option>
                      <option value="500to1000">500.000 - 1.000.000</option>
                      <option value="over1000">Trên 1.000.000</option>
                  </select>
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