import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../pages/Home/Home';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const slides = [
    { ...products[products.length - 1], id: 'clone-last' }, 
    ...products,
    { ...products[0], id: 'clone-first' } 
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setCurrentSlide((prev) => prev - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setCurrentSlide((prev) => prev + 1);
  };

  const handleImageClick = (productId) => {
    if (productId.toString().startsWith('clone-')) {
      const originalId = productId === 'clone-first' ? products[0].id : products[products.length - 1].id;
      navigate(`/product/${originalId}`);
    } else {
      navigate(`/product/${productId}`);
    }
  };

  useEffect(() => {
    if (isTransitioning) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      if (currentSlide === 0) {
        setIsTransitioning(true);
        setCurrentSlide(products.length);
      }
      else if (currentSlide === slides.length - 1) {
        setIsTransitioning(true);
        setCurrentSlide(1);
      }
    };

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('transitionend', handleTransitionEnd);
      return () => carouselContainer.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentSlide, isTransitioning, slides.length, products.length]);

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

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div 
        className="carousel-container"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 1.5s ease-in-out' : 'none'
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
            className={`carousel-indicator ${index === (currentSlide - 1) % products.length ? 'active' : ''}`}
            onClick={() => goToSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 