import React, { useContext, useState, createContext } from 'react';

const TeamsContext = createContext(null);

export const TeamsProvider = ({ children }) => {
  const [headers, setHeaders] = useState([]);
  const [file, setFile] = useState(null);
  const [dataStudents, setDataStudents] = useState([]);

  return (
    <TeamsContext.Provider value={[headers, setHeaders, file, setFile, dataStudents, setDataStudents]}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {return useContext(TeamsContext)};
