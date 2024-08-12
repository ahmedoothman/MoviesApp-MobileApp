import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

const MovieCard = ({ item, FavoritesHandler, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handlePress = () => {
    FavoritesHandler(item.id, favorite);
    setFavorite(!favorite);
  };

  return (
    <Card
      style={{
        width: '70%',
        margin: 10,
        alignSelf: 'center',
      }}
    >
      <Card.Cover
        style={{ marginBottom: 10 }}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
      />
      <Card.Content>
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          {item.title}
        </Text>
        <Button
          icon={favorite ? 'heart' : 'heart-outline'}
          mode='contained'
          onPress={handlePress}
          buttonColor={favorite ? '#e84118' : '#2f3640'}
        >
          {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
