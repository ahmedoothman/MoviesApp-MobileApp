import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e84118', // Active tab color
        tabBarStyle: {
          backgroundColor: '#f8f8f8', // Tab bar background color
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: true,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
          title: 'Home', // Title of the tab
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='star' color={color} size={size} />
          ),
          title: 'Favorites', // Title of the tab
        }}
      />
    </Tab.Navigator>
  );
}
