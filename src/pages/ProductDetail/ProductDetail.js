import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../Home/Home';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorite();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Sản phẩm không tồn tại</h2>
            <button onClick={() => navigate('/')} className="back-btn">
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      alert(`Đã xóa ${product.name} khỏi danh sách yêu thích!`);
    } else {
      addToFavorites(product);
      alert(`Đã thêm ${product.name} vào danh sách yêu thích!`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={handleBackToHome} className="back-btn">
          ← Quay lại
        </button>
        
        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          
          <div className="product-info-detail">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price-detail">
              <span className="price">{formatPrice(product.price)}</span>
            </div>
            
            <div className="product-description-detail">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-specs">
              <h3>Thông số kỹ thuật</h3>
              <ul>
                <li><strong>Mã sản phẩm:</strong> {product.id}</li>
                <li><strong>Danh mục:</strong> Sách</li>
                <li><strong>Tình trạng:</strong> Còn hàng</li>
                <li><strong>Bảo hành:</strong> 12 tháng</li>
              </ul>
            </div>
            
            <div className="product-actions">
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Thêm vào giỏ hàng
              </button>
              <button onClick={handleToggleFavorite} className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}>
                {isFavorite(product.id) ? '❤️ Đã yêu thích' : '🤍 Yêu thích'}
              </button>
              <button onClick={() => navigate('/cart')} className="view-cart-btn">
                Xem giỏ hàng
              </button>
            </div>
          </div>
        </div>
        
        <div className="related-products">
          <h2>Sản phẩm liên quan</h2>
          <div className="related-grid">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <div 
                  key={relatedProduct.id} 
                  className="related-product-card"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <p>{formatPrice(relatedProduct.price)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 