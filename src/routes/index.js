import React from 'react';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { useAuth } from '../context/AuthContext';
import Loading from '../pages/Loading/Loading';

const Routes = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;