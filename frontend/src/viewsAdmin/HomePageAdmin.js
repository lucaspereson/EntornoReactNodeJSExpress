import React, { useState, useEffect } from 'react';
import NewsItem from '../components/NewsItem';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
const pages = [['Home', '/homeAdmin'], ['Usuarios', '/agregar-usuario'], ['Modulos', '/modulos']];

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
      <ResponsiveAppBar pages={pages}/>
      <h1 style={{marginTop: 100}}>Últimas Noticias</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {newsList.length > 0 ? (
          newsList.map(news => <NewsItem key={news.id} news={news} />)
        ) : (
          <p>Cargando noticias...</p>
        )}
      </div>
    </div>
  );
}

export default HomePageAdmin;
