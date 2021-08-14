import React, {createContext, useState, useEffect, useContext} from 'react';
import { BASE_URL } from '../utils/api/api'
import request, { cadastro } from '../utils/api/request'
const FinancaContext = createContext ({})

export const FinancasProvider = props => {
    return (
        <FinancaContext.Provider value={{
            state: {
                cadastro
            }
        }}>
            {props.children}
        </FinancaContext.Provider>
    )
}

export default FinancaContext;