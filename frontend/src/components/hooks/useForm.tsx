import React, { useState } from 'react';

import { validate } from '../../utils/validators';

interface IState {
  [key: string]: string | number
}


const useForm = (callback: Function, initState: IState) => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState(initState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    
    setErrors(prev => ({
      ...prev,
      [name]: validate(value, name),
    }));

    setState(prev => ({
        ...prev,
        [name] : value,
    }));
  }

  const submitHandler = () => {
    callback();
  }

  return { inputChangeHandler, submitHandler, setErrors, errors, state }
}

export default useForm;