import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../Home/Home';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorite();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleRemoveFromFavorites = (product) => {
    removeFromFavorites(product.id);
    alert(`Đã xóa ${product.name} khỏi danh sách yêu thích!`);
  };

  const handleViewDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="favorites">
      <div className="container">
        <h1 className="favorites-title">Sản phẩm yêu thích</h1>
        
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2>Chưa có sản phẩm yêu thích</h2>
            <p>Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
            <button onClick={() => navigate('/')} className="browse-btn">
              Duyệt sản phẩm
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((product) => (
              <div key={product.id} className="favorite-card">
                <div className="favorite-image">
                  <img src={product.image} alt={product.name} />
                  <button 
                    className="remove-favorite-btn"
                    onClick={() => handleRemoveFromFavorites(product)}
                    title="Xóa khỏi yêu thích"
                  >
                    ❌
                  </button>
                </div>
                <div className="favorite-info">
                  <h3 className="favorite-name">{product.name}</h3>
                  <p className="favorite-price">{formatPrice(product.price)}</p>
                  <p className="favorite-description">{product.description}</p>
                  <div className="favorite-actions">
                    <button 
                      className="view-detail-btn"
                      onClick={() => handleViewDetail(product.id)}
                    >
                      Xem chi tiết
                    </button>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 