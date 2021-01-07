import React, { FC } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './Auth.css';

import Input from '../common/Input';
import useForm from '../hooks/useForm';


interface LoginProps {
  loginHandler():void;
  isAuth: boolean;
}

const Login: FC<LoginProps> = ({ isAuth, loginHandler }) => {
  const history = useHistory();
  const { submitHandler, inputChangeHandler, state } = useForm(callback);

  if(isAuth) {
    return <Redirect to='/' />
  }
  
  function callback () {
    loginHandler();
    history.push('/');
    console.log(state);
  } 

  return (
    <section className="form-wrapper">
      <Input 
        label='Email' 
        type='email' 
        value={state.email} 
        onChange={inputChangeHandler}
      />
      <Input
        label='Password' 
        type='password' 
        value={state.password}
        onChange={inputChangeHandler}
      />
      <button onClick={submitHandler}>Login</button>
    </section>
  );
}

export default Login