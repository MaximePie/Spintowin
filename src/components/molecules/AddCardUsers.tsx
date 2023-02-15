import React, { useEffect, useState } from 'react';
import { getFromServer } from '../../services/server';
import AddCardUser from './AddCardUser';
import User from '../../types/User';

// The user has been somehow completed...
export type UserWithDetails = User & {
  cardsCount: number,
}
export default function AddCardUsers() {
  // All the users in the database
  const [users, setUsers] = useState<UserWithDetails[]>([]);

  // The  _id selected by the user
  const [displayedUser, setDisplayedUser] = useState<UserWithDetails['_id']>();

  // Fetch users at the first display of the component
  useEffect(fetchUsers, []);

  return (
    <div className="AddCardUsers">
      <h3>Ou ajouter des cartes d'autres utilisateurs</h3>
      <div className="AddCardUsers__body">
        <div className="AddCardUsers__users">
          {users.map(({
            _id: userId,
            username,
            cardsCount,
            level,
          }) => (
            <div
              key={userId.toString()}
              className={`AddCardUsers__user ${
                displayedUser === userId ? 'AddCardUsers__user--active' : ''
              }`}
              onClick={() => setDisplayedUser(userId)}
              onKeyUp={(event) => event.key === 'enter' && setDisplayedUser(userId)}
              role="button"
              tabIndex={0}
            >
              <h4 className="AddCardUsers__user-name">{username}</h4>
              <p className="AddCardUsers__user-details">
                <span className="AddCardUsers__user-detail">
                  Niveau :
                  {' '}
                  <strong>{level}</strong>
                </span>
                <span className="AddCardUsers__user-detail">
                  Questions :
                  {' '}
                  <strong>{cardsCount}</strong>
                </span>
              </p>
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
