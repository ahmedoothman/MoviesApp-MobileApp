import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import MovieCard from '../components/MovieCard';
import { getFavorites, removeFavorite } from '../localStorage';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  // This hook will run when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
      };

      loadFavorites();
    }, [])
  );

  const removeFavoritesHandler = async (id) => {
    await removeFavorite(id);
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            isFavorite={true}
            FavoritesHandler={removeFavoritesHandler}
          />
        )}
      />
    </View>
  );
}
