import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import './Home.css';

import { GET_POSTS, CREATE_POST } from '../../utils/graphQL';

import Post from './Post';
import Input from '../common/Input';
import useForm from '../hooks/useForm';


interface IPost {
  id: string,
  text: string,
  creator: { username: string }
}


const Home: FC = () => {
  const {  
    state, 
    errors, 
    setState,
    setErrors, 
    submitHandler, 
    inputChangeHandler 
  } = useForm(callback, { text: '' });

  const [createPost] = useMutation(CREATE_POST, {
    variables: state,
    update: (proxy, { data }) => {
      // get created posts
      const fetchedData: any = proxy.readQuery({
        query: GET_POSTS
      });
      // make this, because if don't have a created posts will not work
      let getPosts: IPost[] = fetchedData ? fetchedData.getPosts : [];
      
      // get new post
      const createPost: IPost = data.createPost;

      // add new post to created posts
      getPosts = [createPost, ...getPosts];
      // update apollo cache with new post
      proxy.writeQuery({ query: GET_POSTS, data: { getPosts }});
    },
    onError: (err) => {
      const errMsg = err.graphQLErrors[0]?.message;

      // if have user input errors
      if(errMsg === 'Errors') {
        setErrors(err.graphQLErrors[0]?.extensions?.errors);
        return;
      }
    }
  });

  const { loading, error, data } = useQuery(GET_POSTS, { returnPartialData: true });
  const posts: IPost[] = data?.getPosts;

  if (loading) return <p>Loading....</p>;

  function callback () {
    createPost();
    setErrors({ text: '' });
    setState({ text: '' });
  }

  return (
    <div className="home">
      <div className="form-post">
        <Input
          label='Text' 
          type='text' 
          value={state.text}
          err={errors.text}
          onChange={inputChangeHandler}
        />
        <button onClick={submitHandler}>Create Post</button>
      </div>
      {error && <p>{error.message}</p>}
      {!error && posts.map(post => {
        return <Post key={post.id} id={post.id} text={post.text} creator={post.creator.username} />
      })}
    </div>
  );
}

export default Home;
