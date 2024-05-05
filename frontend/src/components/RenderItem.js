import React from 'react';
import ArticleItem from './ArticleItem';
import VideoItem from './VideoItem';

function RenderItem(props) {
    const {item, height} = props;
    switch (item.type) {
      case 'video':
        return (
        <VideoItem video={item} height={height} />)
      case 'article':
      default:
        return (
          <ArticleItem article={item} height={height} /> );
    }
  };
export default RenderItem;