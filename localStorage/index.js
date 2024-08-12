import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (movie) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    // check if movie is already in favorites
    const isFavorite = favoritesArray.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      return;
    }
    favoritesArray.push(movie);
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  } catch (error) {
    console.error(error);
  }
};

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error(error);
  }
};

export const removeFavorite = async (id) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];
    const updatedFavorites = favoritesArray.filter((movie) => movie.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error(error);
  }
};
export const isFavorite = async (id) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];
    return favoritesArray.some((fav) => fav.id === id);
  } catch (error) {
    console.error(error);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Local storage cleared successfully!');
  } catch (error) {
    console.error('Error clearing local storage:', error);
  }
};
// clearStorage();
