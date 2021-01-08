import React, { FC } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import Input from '../common/Input';
import useForm from '../hooks/useForm';


interface RegisterProps {
  loginHandler():void;
  isAuth: boolean;
}

const Register:FC<RegisterProps> = ({ loginHandler, isAuth }) => {
  const history = useHistory();
  const { submitHandler, inputChangeHandler, state } = useForm(callback, {});

  if(isAuth) {
    return <Redirect to='/' />
  }

  function callback () {
    loginHandler();
    history.push('/');
    console.log(state)
  }


  return (
    <section className="form-wrapper" style={{height: "24rem"}}>
      <Input
        label='Name' 
        type='text' 
        value={state.name} 
        onChange={inputChangeHandler}
      />
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
      <button onClick={submitHandler}>Register</button>
    </section>
  )
}

export default Register;