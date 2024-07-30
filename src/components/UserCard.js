import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td><img src={user.image} alt={user.firstName} className="user-image" /></td>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{`${user.gender}/${user.age}`}</td>
      <td>{user.company?.title || 'N/A'}</td>
      <td>{`${user.location?.city || 'Unknown'}, ${user.location?.country || 'Unknown'}`}</td>
    </tr>
  );
};

export default UserCard;
