import React, { useState } from 'react';

interface IState {
  [key: string]: string | number
}


const useForm = (callback: Function) => {
  const [state, setState] = useState<IState>({});

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    
    setState(prev => ({
        ...prev,
        [name] : value,
    }));
  }

  const submitHandler = () => {
    callback();
  }

  return { inputChangeHandler, submitHandler, state }
}

export default useForm;