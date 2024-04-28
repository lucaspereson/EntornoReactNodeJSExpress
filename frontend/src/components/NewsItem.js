import React from 'react';

function NewsItem({ news }) {
  //const {key, news} = news;
  if (!news) {
    return null;
  }
  if (news.title === undefined) {
    news.title='No title';
  }
  if (news.summary === undefined) {
    news.summary='No summary';
  }
  if (news.imageUrl === undefined) {
    news.imageUrl='No image';
  }
  
  return (
    <div style={{ margin: 10, width: '100%'}}>
      <h3>{news.title}</h3>
      <img src={news.imageUrl} alt={news.title} style={{ width: '100%', height: '100%' }} />
      <p>{news.summary}</p>
    </div>
  );
}

export default NewsItem;
