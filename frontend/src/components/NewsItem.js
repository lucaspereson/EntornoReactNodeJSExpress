import React from 'react';

function NewsItem({ news }) {
  //const {key, news} = news;
  return (
    <div style={{ margin: 10, width: '100%'}}>
      <h3>{news.title}</h3>
      <img src={news.imageUrl} alt={news.title} style={{ width: '100%', height: '100%' }} />
      <p>{news.summary}</p>
    </div>
  );
}

export default NewsItem;
