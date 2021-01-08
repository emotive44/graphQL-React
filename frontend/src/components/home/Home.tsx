import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import './Home.css';

import { GET_POSTS } from '../../utils/graphQL';

import Post from './Post';


interface IPost {
  id: string,
  text: string,
  creator: { username: string }
}


const Home: FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const posts: IPost[] = data?.getPosts;

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}`</p>;

  return (
    <div className="home">
      {posts.map(post => {
        return <Post key={post.id} id={post.id} text={post.text} creator={post.creator.username} />
      })}
    </div>
  );
}

export default Home;
