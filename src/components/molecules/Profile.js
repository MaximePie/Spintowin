import React, {useEffect, useState} from 'react';
import "../../style/molecules/Profile.scss"
import castorImage from "../../images/castor.jpg";
import {getFromServer} from "../../server";

export default function Profile() {
  const [user, setUser] = useState({});
  const {level, experience, username} = user || {};
  console.log(user);

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
      <p>{username}, niveau {level}</p>
      <p>XP : {experience}</p>
    </div>
  );

  function fetchUserData() {
    getFromServer('/users/connectedUser/').then(({data}) => setUser(data.user))
  }
}
