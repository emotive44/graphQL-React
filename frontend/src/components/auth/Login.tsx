import React, { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/graphQL';
import setStorage from '../../utils/setStorage';
import './Auth.css';

import Input from '../common/Input';
import useForm from '../hooks/useForm';



interface ILoginUser {
  id: string;
  username: string;
  token: string;
}

interface LoginProps {
  loginHandler(): void;
  isAuth: boolean;
}

const Login: FC<LoginProps> = ({ isAuth, loginHandler }) => {
  const history = useHistory();
  const [graphQLError, setGraphQLError] = useState('');
  const { 
    state, 
    errors, 
    setErrors, 
    submitHandler, 
    inputChangeHandler, 
  } = useForm(callback, { email: '', password: '' });

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: state,
    onCompleted: ({ loginUser }: { loginUser: ILoginUser}) => {
      setStorage(loginUser);
      loginHandler();
      history.push('/');
    },
    onError: (err) => {
      const errMsg = err.graphQLErrors[0]?.message;

      // if have user input errors
      if(errMsg === 'Errors') {
        setErrors(err.graphQLErrors[0]?.extensions?.errors);
        return;
      }

      // this error is from graphQL
      setGraphQLError(errMsg);
    },
  });

  if(isAuth) {
    return <Redirect to='/' />
  }
  
  function callback () {
    loginUser();
    setErrors({ email: '', password: '' });
    setGraphQLError('');
  } 

  return (
    <section className="form-wrapper">
      <Input 
        label='Email' 
        type='email' 
        value={state.email} 
        err={errors.email}
        onChange={inputChangeHandler}
      />
      <Input
        label='Password' 
        type='password' 
        value={state.password}
        err={errors.password}
        onChange={inputChangeHandler}
      />
      <button onClick={submitHandler}>Login</button>
      {graphQLError && <p className="error">{graphQLError}</p>}
    </section>
  );
}

export default Login