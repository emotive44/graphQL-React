import React, { FC, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import './Home.css';

import { GET_POSTS, CREATE_POST, NEW_POST } from '../../utils/graphQL';

import Post from './Post';
import Input from '../common/Input';
import useForm from '../hooks/useForm';


interface IPost {
  id: string,
  text: string,
  creator: { username: string }
}

interface HomeProps {
  isAuth: boolean
}


const Home: FC<HomeProps> = ({ isAuth }) => {
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
    onCompleted: () => {
      setErrors({ text: '' });
      setState({ text: '' });
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

  function callback () {
    createPost();
  }
  
  // fetchPolicy: cache and network check 
  // If have new posts in database - give them with request else give posts from cache
  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS, { fetchPolicy: 'cache-and-network' });
  const posts: IPost[] = data?.getPosts;


  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost: IPost = subscriptionData.data.newPost;
        const prevPosts: IPost[] = prev.getPosts || [];
  
        return Object.assign({}, prev, {
          getPosts: [newPost, ...prevPosts]
        });
      },
    });

    return () => unsubscribe();
  });

  if (loading) return <p>Loading....</p>;
  
  if(!isAuth) {
    return <Redirect to='/login' />
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
