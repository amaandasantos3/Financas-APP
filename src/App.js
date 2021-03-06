import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './routes';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}