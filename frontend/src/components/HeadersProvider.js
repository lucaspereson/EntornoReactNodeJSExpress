import React, { useContext, useState, createContext } from 'react';

const HeadersContext = createContext(null);

export const HeadersProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);

  return (
    <HeadersContext.Provider value={[headers, setHeaders]}>
      {children}
    </HeadersContext.Provider>
  );
};

export const useHeaders = () => {return useContext(HeadersContext)};
