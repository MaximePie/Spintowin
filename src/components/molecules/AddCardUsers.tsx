import React, { useEffect, useState } from 'react';
import { getFromServer } from '../../services/server';
import AddCardUser from './AddCardUser';
import User from '../../types/User';

export default function AddCardUsers() {
  // All the users in the database
  const [users, setUsers] = useState<User[]>([]);

  // The  _id selected by the user
  const [displayedUser, setDisplayedUser] = useState<User['_id']>();

  // Fetch users at the first display of the component
  useEffect(fetchUsers, []);

  return (
    <div className="AddCardUsers">
      <h3>Ou ajouter des cartes d'autres utilisateurs</h3>
      <div className="AddCardUsers__body">
        <div className="AddCardUsers__users">
          {users.map((user) => (
            <div
              key={user._id.toString()}
              className={`AddCardUsers__user ${
                displayedUser === user._id ? 'AddCardUsers__user--active' : ''
              }`}
              onClick={() => setDisplayedUser(user._id)}
              onKeyUp={(event) => event.key === 'enter' && setDisplayedUser(user._id)}
              role="button"
              tabIndex={0}
            >
              <p>{user.username}</p>
            </div>
          ))}
        </div>
        <div className="AddCardUsers__user-cards">
          {displayedUser && <AddCardUser userId={displayedUser} />}
        </div>
      </div>
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
