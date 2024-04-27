import React, { useState, useEffect } from 'react';
import NewsItem from '../components/NewsItem';
import AppBar from '../components/AppBar';
import { Box, Grid, Typography, Button } from '@mui/material';

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
    <div>
      <AppBar/>
      <Typography variant="h4" sx={{ mt:13, mb: 4, textAlign: 'center' }}>Últimas Noticias</Typography>
      <Grid container justifyContent="center" spacing={2} marginBottom={5}>
        {newsList.length > 0 ? (
          newsList.map((news, index) => (
            <Grid item xs={index === 0 ? 12 : 6} key={news.id} sx={{ maxWidth: '1000px' }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                p: 2, 
                border: '1px solid blue', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                bgcolor: index === 0 ? 'primary.light' : 'background.paper',
                color: index === 0 ? 'common.white' : 'text.primary',
                marginLeft:   index === 0 ? (10) : 
                              index%2 === 0 ? (0) : 
                              10,
                marginRight:  index === 0 ? (10) : 
                              index%2 === 0 ? (10) : 
                              0,
              }}>
                <NewsItem news={news} />
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 2 }} 
                  onClick={() => window.open(news.link, '_blank')}>
                  Leer más
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography>Cargando noticias...</Typography>
        )}
      </Grid>
    </div>
  );
}

export default HomePage;
