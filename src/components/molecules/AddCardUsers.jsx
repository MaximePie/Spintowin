import React, {useEffect, useState} from 'react';
import {getFromServer} from "../../services/server";
import AddCardUser from "./AddCardUser";

export default function AddCardUsers() {

  // All the users in the database
  const [users, setUsers] = useState([]);

  // The  _id selected by the user
  const [displayedUser, setDisplayedUser] = useState(undefined);

  // Fetch users at the first display of the component
  useEffect(fetchUsers, []);

  return (
    <div className="AddCardUsers">
      {users.map(user => (
        <div
          key={user._id}
          className="AddCardUsers__user"
          onClick={() => setDisplayedUser(user._id)}
        >
          <p>{user.username}</p>
        </div>
      ))}
      {displayedUser && <AddCardUser userId={displayedUser}/>}
    </div>
  );

  /**
   * Fetch the users and set it
   */
  function fetchUsers() {
    getFromServer("users").then(({status, data}) => {
      if (status === 200) {
        setUsers(data.users);
      }
      else {
        // TODO - Implement Error
      }
    })
  }
}
