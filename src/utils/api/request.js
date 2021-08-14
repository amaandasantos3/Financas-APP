import api from './api';
import {Alert} from 'react-native';

export const listFinancas = async (page = 1) => {
  try {
    const response = await api.get(`expenses?page=${page}&perPage=20`);

    if (response) {
      console.log('list - finanças', response.data);
      return response.data;
    }
  } catch (error) {
    console.error({error});
  }

  Alert.alert(
    'Oops..',
    'Ocorreu um erro ao listar suas finanças, tente novamente mais tarde.',
  );

  return [];
};

export const createFinancas = async data => {
  console.debug({data});

  try {
    const response = await api.post('expenses', data);

    if (response) {
      console.log('create - finanças', response.data);
      Alert.alert('Sucesso!', 'Criado com sucesso!');
      return response.data;
    }
  } catch (error) {
    console.error({error});
  }

  Alert.alert(
    'Oops..',
    'Ocorreu um erro ao cadastrar sua finança, tente novamente mais tarde.',
  );

  return {};
};

export const updateFinancas = async (id, data) => {
  try {
    const response = await api.put(`expenses/${id}`, data);

    if (response) {
      console.log('create - finanças', response.data);

      Alert.alert('Sucesso!', 'Atualizado com sucesso!');

      return response.data;
    }
  } catch (error) {
    console.error({error});
  }

  Alert.alert(
    'Oops..',
    'Ocorreu um erro ao atualizar sua finança, tente novamente mais tarde.',
  );

  return {};
};

export const deleteFinancas = async id => {
  try {
      console.log('id', id)
    const response = await api.delete(`expenses/${id}`);

    Alert.alert('Sucesso!', 'Removido com sucesso!');

    return response.data;
  } catch (error) {
    console.error(error);
  }

  Alert.alert(
    'Oops..',
    'Ocorreu um erro ao remover sua finança, tente novamente mais tarde.',
  );

  return null;
};
