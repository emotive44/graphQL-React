import React, { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './Auth.css';

import { REGISTER_USER } from '../../utils/graphQL';
import setStorage from '../../utils/setStorage';
import { ILoginUser } from './Login';


import Input from '../common/Input';
import useForm from '../hooks/useForm';


interface RegisterProps {
  loginHandler():void;
  isAuth: boolean;
}

const Register:FC<RegisterProps> = ({ loginHandler, isAuth }) => {
  const history = useHistory();
  const [graphQLError, setGraphQLError] = useState('');
  const { 
    state, 
    errors, 
    setErrors, 
    submitHandler, 
    inputChangeHandler, 
  } = useForm(callback, { email: '', password: '', username: '' });

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: state,
    onCompleted: ({ registerUser }: { registerUser: ILoginUser}) => {
      setStorage(registerUser);
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
    registerUser();
    setGraphQLError('');
    setErrors({ email: '', password: '', username: '' });
  }


  return (
    <section className="form-wrapper" style={{height: "31rem"}}>
      <Input
        label='Username' 
        type='text' 
        err={errors.username}
        value={state.username} 
        onChange={inputChangeHandler}
      />
      <Input 
        label='Email' 
        type='email' 
        err={errors.email}
        value={state.email} 
        onChange={inputChangeHandler}
      />
      <Input 
        label='Password' 
        type='password' 
        err={errors.password}
        value={state.password}
        onChange={inputChangeHandler}
      />
      <button onClick={submitHandler}>Register</button>
      {graphQLError && <p className="error">{graphQLError}</p>}
    </section>
  )
}

export default Register;