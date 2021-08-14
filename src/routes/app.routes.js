import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FinancasList from '../pages/FinancasList/FinancasList';
import Financa from '../pages/Financas/Financa';
import { FinancasProvider } from '../context/FinancasContext';

const AppStack = createStackNavigator();

const AppRoutes = () => (
 <FinancasProvider>
  <AppStack.Navigator>
    <AppStack.Screen name="Meus gastos" component={FinancasList} />
    <AppStack.Screen name="Financa" component={Financa} />
  </AppStack.Navigator>
  </FinancasProvider>
);

export default AppRoutes;