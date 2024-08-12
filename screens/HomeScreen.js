import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { getFavorites, saveFavorite, removeFavorite } from '../localStorage';
import { ActivityIndicator, Menu, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function HomeScreen() {
  const [category, setCategory] = useState('top_rated');
  const [favorites, setFavorites] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    };
    loadFavorites();
  }, []);

  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies', category],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=9813ce01a72ca1bd2ae25f091898b1c7`
      );
      return response.data.results;
    },
  });

  const toggleFavoriteHandler = async (id, isFavorite) => {
    if (isFavorite) {
      await removeFavorite(id);
    } else {
      const movie = movies.find((movie) => movie.id === id);
      await saveFavorite(movie);
    }
    const updatedFavorites = await getFavorites();
    setFavorites(updatedFavorites);
  };

  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <TextInput
          placeholder='Search Movies'
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button onPress={() => setMenuVisible(true)} mode='text'>
              <Icon name='filter' size={20} color={'#2f3640'} />
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setCategory('top_rated');
              setMenuVisible(false);
            }}
            title='Top Rated'
          />
          <Menu.Item
            onPress={() => {
              setCategory('upcoming');
              setMenuVisible(false);
            }}
            title='Upcoming'
          />
          <Menu.Item
            onPress={() => {
              setCategory('now_playing');
              setMenuVisible(false);
            }}
            title='Now Playing'
          />
        </Menu>
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <ActivityIndicator animating={true} color={'#2f3640'} size={40} />
        </View>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              FavoritesHandler={toggleFavoriteHandler}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
