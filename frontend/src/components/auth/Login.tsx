import React, { FC, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './Auth.css';

import Input from '../common/Input';


interface LoginProps {
  loginHandler():void;
  isAuth: boolean;
}

const Login: FC<LoginProps> = ({ isAuth, loginHandler }) => {
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  if(isAuth) {
    return <Redirect to='/' />
  }
  
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setState(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  

  const submitHandler = () => {
    loginHandler();
    history.push('/');
    console.log(state)
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