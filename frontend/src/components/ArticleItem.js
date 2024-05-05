import React from 'react';

function ArticleItem({ article, height }) {
  //const {key, article} = article;
  if (!article) {
    return null;
  }
  if (article.title === undefined) {
    article.title='No title';
  }
  if (article.summary === undefined) {
    article.summary='No summary';
  }
  if (article.imageUrl === undefined) {
    article.imageUrl='No image';
  }
  
  return (
    <div style={{ margin: 0, width: '100%'}}>
      <h3>{article.title}</h3>
      <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: height }} />
      <p>{article.summary}</p>
    </div>
  );
}

export default ArticleItem;
