const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validate = (value: string, name: string): string => {
  switch(name) {
    case 'email':
      if (value === '') {
        return 'Please enter an email';
      } else if (!validateEmail(value)) {
        return 'Please enter a valid email';
      } else {
        return 'correct';
      }
    case 'password':
      if(value === '') {
        return 'Please enter a password';
      } else if (value.length < 6) {
        return 'Password should have to be more than 6 characters';
      } else {
        return 'correct';
      }
    case 'username':
      if(value === '') {
        return 'Please enter a username';
      } else if(value.length < 4) {
        return 'Username should have to be more than 4 characters';
      } else if (value.length > 15) {
        return 'Username should have to be less than 15 characters'
      } else if (value.match(/^\d/)) {
        return 'Username can not start with digit';
      } else {
        return 'correct';
      }
    case 'text':
      if(value === '') {
        return 'Can not create post without content';
      } else if (value.length < 4) {
        return 'Content should have to be more than 4 characters';
      }
  }

  return '';
};