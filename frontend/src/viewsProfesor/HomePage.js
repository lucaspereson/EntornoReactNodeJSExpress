import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import RenderItem from '../components/RenderItem';
import { Box, Grid, Typography, Button } from '@mui/material';
import fondo from './fondo.jpg';

function HomePage() {
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
    <Box sx={{
      backgroundImage: `url(${fondo})`,
      backgroundPosition: 'center',
      height: '100%',
      width: 'auto',
      top: 0,
      left: 0,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
    }}
    >
      <AppBar />
      <Typography variant="h4" sx={{ mt: 13, mb: 4, textAlign: 'center', fontFamily: 'unset', fontWeight: 700, color: 'white' }}>¡Artículos que podrían interesarte!</Typography>
      <Grid container justifyContent="center" spacing={2} marginBottom={5} s>
        {newsList.length > 0 ? (
          newsList.map((item, index) => (
            <Grid item xs={index === 0 ? 12 : 6} key={item.id} sx={{ width: '100%' }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingX: 2,
                paddingBottom: 2,
                border: '1px solid blue',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                bgcolor: index === 0 ? 'primary.light' : 'background.paper',
                color: index === 0 ? 'common.white' : 'text.primary',
                marginLeft: index === 0 ? (10) :
                  index % 2 === 0 ? (0) :
                    10,
                marginRight: index === 0 ? (10) :
                  index % 2 === 0 ? (10) :
                    0,

              }}>
                <RenderItem item={item} height={index === 0 ? ('100%') : ('350px')} />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => window.open(item.link, '_blank')}>
                  Leer más
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography>Cargando noticias...</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default HomePage;
