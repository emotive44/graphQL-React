import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import './Users.css';

import { GET_USERS } from '../../utils/graphQL';
import UserItem from './UserItem';


interface IUser {
  id: string,
  email: string,
  username: string
}


const Users: FC = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const users: IUser[] = data?.getUsers;

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}`</p>;

  return (
    <div className="users">
      {users.map(user => {
        return <UserItem key={user.id} id={user.id} email={user.email} username={user.username} />
      })}
    </div>
  );
}

export default Users;