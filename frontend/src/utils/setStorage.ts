interface IData {
  id: string;
  token: string;
  username: string; 
}

const setStorage = (data: IData) => {
  const { id, username, token } = data;

  localStorage.setItem('uid', id);
  localStorage.setItem('uname', username);
  localStorage.setItem('token', token);
}

export default setStorage;