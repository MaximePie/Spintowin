import React, { useEffect, useState } from 'react';
import castorImage from '../../resources/images/castor.jpg';
import { getFromServer } from '../../services/server';
import User from '../../types/User';

export default function Profile() {
  const [user, setUser] = useState<User>({} as User);
  const { level, experience, username } = user || {};

  useEffect(fetchUserData, []);

  return (
    <div className="Profile">
      <div className="Profile__image-container">
        <img
          className="Profile__image"
          src={castorImage}
          alt={"Avatar d'utilisateur"}
        />
      </div>
      <p>
        {username}
        , niveau
        {' '}
        {level}
      </p>
      <p>
        XP :
        {experience}
      </p>
    </div>
  );

  function fetchUserData() {
    getFromServer('/users/connectedUser/').then(({ data }) => setUser(
      // @ts-ignore
      {
        experience: data.experience,
        level: data.level,
        username: data.username,
      },
    ));
  }
}
