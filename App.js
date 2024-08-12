import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BottomNavigator from './components/BottomNavigator';
import { StatusBar } from 'expo-status-bar';
const queryClient = new QueryClient();
import { PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='auto' />
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
