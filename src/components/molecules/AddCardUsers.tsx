import React, { useEffect, useState } from 'react';
import { getFromServer } from '../../services/server';
import AddCardUser from './AddCardUser';
import UserType from '../../types/UserType';

export default function AddCardUsers() {
  // All the users in the database
  const [users, setUsers] = useState<UserType[]>([]);

  // The  _id selected by the user
  const [displayedUser, setDisplayedUser] = useState<UserType['_id']>();

  // Fetch users at the first display of the component
  useEffect(fetchUsers, []);

  return (
    <div className="AddCardUsers">
      {users.map((user) => (
        <div
          key={user._id.toString()}
          className="AddCardUsers__user"
          onClick={() => setDisplayedUser(user._id)}
          onKeyUp={(event) => event.key === 'enter' && setDisplayedUser(user._id)}
          role="button"
          tabIndex={0}
        >
          <p>{user.username}</p>
        </div>
      ))}
      {displayedUser && <AddCardUser userId={displayedUser} />}
    </div>
  );

  /**
   * Fetch the users and set it
   */
  function fetchUsers() {
    getFromServer('users').then(({ status, data }) => {
      if (status === 200) {
        setUsers(data.users);
      } else {
        // TODO - Implement Error
      }
    });
  }
}
