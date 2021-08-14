import React, {createContext, useState, useEffect, useContext} from 'react';
import financas from '../data/financas';
import {listFinancas, createFinancas, updateFinancas, deleteFinancas} from '../utils/api/request';

const FinancasContext = createContext({
  financas: [],
  createFinancas: () => {},
  updateFinancas: () => {},
  deleteFinancas: () => {}
});

export const FinancasProvider = ({children}) => {
  const [financas, setFinancas] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getFinancas();
  }, []);

  async function getFinancas() {
      setFinancas(await listFinancas(page));
  }

  return (
    <FinancasContext.Provider value={{financas, createFinancas, updateFinancas, deleteFinancas, getFinancas}}>
      {children}
    </FinancasContext.Provider>
  );
};

export function useFinancas() {
    return useContext(FinancasContext);
  }
  

export default FinancasContext;
