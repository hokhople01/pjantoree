import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        

      </div>
      <div className="header-container">
        <h1 className="header-title">Antoree</h1>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li>
              <Link 
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link 
                to="/cart"
                className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
              >
                Giỏ hàng
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites"
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
              >
                Yêu thích
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 