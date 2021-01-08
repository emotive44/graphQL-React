import React, { FC } from 'react';
import './Post.css';


interface PostProps {
  id: string,
  text: string,
  creator: string,
}

const Post: FC<PostProps> = ({ id, text, creator }) => {
  return (
    <div className="post">
      <p className="creator">Creator: {creator.toUpperCase()}</p>
      <p className="text">{text}</p>
    </div>
  );
}

export default Post;