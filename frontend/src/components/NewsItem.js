import React from 'react';

function NewsItem({ news }) {
  //const {key, news} = news;
  return (
    <div style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', maxWidth: '50%'}}>
      <h3>{news.title}</h3>
      <img src={news.imageUrl} alt={news.title} style={{ width: '100%', height: 'auto' }} />
      <p>{news.summary}</p>
    </div>
  );
}

export default NewsItem;
