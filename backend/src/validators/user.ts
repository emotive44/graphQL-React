import emailValidate from '../utils/emailValidate';

interface RegisterInput {
  email: string
  username: string
  password: string
}

interface LoginInput {
  email: string
  password: string
}

const validateRegisterInput = (input: RegisterInput) => {
  const errors = {} as RegisterInput;

  const { email, username, password } = input;

  if (email.trim() === '') {
    errors.email = 'Email is required'
  } else if (email.length < 8) {
    errors.email = 'Email should have to be more than 8 characters'
  } else if(email.length > 20) {
    errors.email = 'Email should have to be less than 20 characters'
  } else if (!emailValidate(email)) {
    errors.email = 'Email is not valid'
  }

  if (username.trim() === '') {
    errors.username = 'Username is required'
  } else if (username.length < 4) {
    errors.username = 'Username should have to be more than 4 characters'
  } else if (username.length > 15) {
    errors.username = 'Username should have to be less than 15 characters'
  } else if (username.match(/^\d/)) {
    errors.username = 'Username can not start with digit'
  }

  if (password.trim() === '') {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password should have to be more than 6 characters'
  } else if (password.length > 15) {
    errors.password = 'Password should have to be less than 15 characters'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

const validateLoginInput = (input: LoginInput) => {
  const errors = {} as LoginInput;

  const { email, password } = input;

  if (email.trim() === '') {
    errors.email = 'Email is required'
  } else if (!emailValidate(email)) {
    errors.email = 'Email is not valid'
  }

  if (password.trim() === '') {
    errors.password = 'Password is required'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}


export {
  validateLoginInput,
  validateRegisterInput,
}