import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ArticleItem from '../components/ArticleItem.js';
import VideoItem from '../components/VideoItem.js';
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

  
  const renderItem = (item) => {
    switch (item.type) {
      case 'video':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%', marginY: 2, padding: 1, border: 1, borderColor: 'blue' }}>
            <VideoItem video={item} />
            <BasicModal textButton={'Detalles de video'} textSecundary={''} Component={<ContentModSectionModal data={item} />} color={'#007FFF'} />
          </Box>);
      case 'article':
      default:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '60%', marginY: 2, padding: 1, border: 1, borderColor: 'blue' }}>
            <ArticleItem article={item} />
            <BasicModal textButton={'Detalles de sección'} textSecundary={''} Component={<ContentModSectionModal data={item} />} color={'#007FFF'} />
          </Box>
        );
    }
  };
  
  
  return (
    <div>
      <AppBar />
      <h1 style={{marginTop: 100}}>Gestión de Secciones</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <BasicModal textButton={'Agregar sección'} textSecundary={'Complete los campos para agregar una sección'} Component={<ContentAddSectionModal/>} color={'#9FA3AC'} />
        {newsList.length > 0 ? 
          newsList.map(item => 
            renderItem(item)) : <p>Cargando secciones...</p>
        }
      </Box>
    </div>
  );
}

export default HomePageAdmin;
