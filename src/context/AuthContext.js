import React, {createContext, useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../utils/api/auth';
import api from '../utils/api/api';

const AuthContext = createContext({
  signed: false,
  user: {},
  email: '',
  error: '',
  loading: false,
  setEmail: () => {},
  setLoading: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStorage();
  }, []);

  async function loadStorage() {
    const storageId = await AsyncStorage.getItem('@RNAuth:id');
    const storageEmail = await AsyncStorage.getItem('@RNAuth:email');
    const storageToken = await AsyncStorage.getItem('@RNAuth:token');

    if (storageId) {
      api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      setSigned(true);
      setUser({
        id: storageId,
        email: storageEmail,
        token: storageToken,
      });
    }
  }

  async function signIn() {
    setLoading(true);

    auth
      .signIn(email)
      .then(({status, data: {_id, email, token}}) => {
        console.log({status, data: {_id, email, token}});
        if (status === 200) {
          setUser({
            id: _id,
            email,
            token,
          });
          setEmail('');
          setError('');
          setSigned(true);
          AsyncStorage.setItem('@RNAuth:id', _id);
          AsyncStorage.setItem('@RNAuth:email', email);
          AsyncStorage.setItem('@RNAuth:token', token);

          api.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
          setError('E-mail inválido.');
        }
      })
      .catch(() => setError('E-mail inválido.'))
      .finally(() => setLoading(false));
  }

  async function signOut() {
    setUser({});
    AsyncStorage.clear();
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{signed, user, loading, signIn, signOut, error, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
