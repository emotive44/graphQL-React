import React, { FC } from 'react';
import './UserItem.css';


interface UserItemProps {
  id: string,
  email: string,
  username: string
}

const UserItem: FC<UserItemProps> = ({ id, email, username }) => {
  return (
    <div className="user">
      <p className="user__name">Username: {username}</p>
      <p className="user__email">Email: {email}</p>
    </div>
  );
}

export default UserItem;
