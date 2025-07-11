import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      const existingFavorite = prevFavorites.find(item => item.id === product.id);
      if (existingFavorite) {
        return prevFavorites; // Đã có trong yêu thích rồi
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      getFavoritesCount
    }}>
      {children}
    </FavoriteContext.Provider>
  );
}; 