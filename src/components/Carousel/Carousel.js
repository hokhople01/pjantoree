import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../pages/Home/Home';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const slides = [
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return slides.length - 1;
      }
      return prev - 1;
    });
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev === slides.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
    };

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('transitionend', handleTransitionEnd);
      return () => carouselContainer.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, []);

  useEffect(() => {
    const startAutoPlay = () => {
      timeoutRef.current = setTimeout(() => {
        if (!isTransitioning) {
          goToNext();
        }
        startAutoPlay();
      }, 1500);
    };

    startAutoPlay();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTransitioning]);

  const currentRealSlide = currentSlide % products.length;

  return (
    <div className="carousel">
      <div 
        className="carousel-container"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        {slides.map((product, index) => (
          <div 
            key={`${product.id}-${index}`} 
            className="carousel-slide"
            onClick={() => handleImageClick(product.id)}
          >
            <img src={product.image} alt={product.name} />
          </div>
        ))}
      </div>

      <button className="carousel-nav prev" onClick={goToPrevious}>
        ‹
      </button>
      <button className="carousel-nav next" onClick={goToNext}>
        ›
      </button>

      <div className="carousel-indicators">
        {products.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentRealSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 