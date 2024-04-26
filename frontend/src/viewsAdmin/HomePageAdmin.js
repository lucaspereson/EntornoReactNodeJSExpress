import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NewsItem from '../components/NewsItem';
import AppBar from '../components/AppBar.js';
import BasicModal from '../components/BasicModal.js';
import ContentAddSectionModal from '../components/ContentAddSectionModal.js';
import ContentModSectionModal from '../components/ContentModSectionModal.js';

function HomePageAdmin() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('http://localhost:5001/news');
      const data = await response.json();
      setNewsList(data);
    };

    fetchNews().catch(console.error);
  }, []);

  return (
    <div>
      <AppBar />
      <h1 style={{marginTop: 100}}>Gestión de Secciones</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <BasicModal textButton={'Agregar sección'} textSecundary={'Complete los campos para agregar una sección'} Component={<ContentAddSectionModal/>} color={'#9FA3AC'} />
        {newsList.length > 0 ? (
          newsList.map(news => 
            <Box key={news.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%', marginY:2, padding:1, border:1, borderColor:'blue' }}>
              <NewsItem key={news.id} news={news}/>
              <BasicModal textButton={'Detalles de sección'} textSecundary={''} Component={<ContentModSectionModal data={news}/>} color={'#007FFF'}/>
            </Box>
        )) : (
          <p>Cargando secciones...</p>)
        }
      </Box>
    </div>
  );
}

export default HomePageAdmin;
