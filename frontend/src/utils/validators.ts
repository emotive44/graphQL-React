const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validate = (value: string, name: string): string => {
  switch(name) {
    case 'email':
      if (value === '') {
        return 'Please enter an email'
      } else if (!validateEmail(value)) {
        return 'Please enter a valid email'
      }
      break;
    case 'password':
      if(value === '') {
        return 'Please enter a password'
      }
      break;
  }

  return '';
};