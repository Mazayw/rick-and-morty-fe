import React, { useReducer } from 'react';
import { createContext } from 'react';
import { initState, reducer, REDUCER_ACTION_TYPE } from './reducer';

export type IAction = {
  type: REDUCER_ACTION_TYPE;
};

export type ContextData = {
  state: typeof initState;
  dispatch: React.Dispatch<IAction>;
};

const GlobalContext = createContext({} as ContextData);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => React.useContext<ContextData>(GlobalContext);
