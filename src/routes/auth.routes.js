import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login/Login';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

export default AuthRoutes;