// useHeaders.js
import { useState, useContext, createContext } from 'react';

// Crear Contexto
const HeadersContext = createContext(null);

export const HeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);
  return (
    <HeadersContext.Provider value={[headers, setHeaders]}>
      {children}
    </HeadersContext.Provider>
  );
};

export const useHeaders = () => {
  const context = useContext(HeadersContext);
  if (!context) {
    throw new Error('useHeaders must be used within a HeadersProvider');
  }
  return context;
};
