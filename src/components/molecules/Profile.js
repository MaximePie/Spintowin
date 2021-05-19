import React from 'react';
import "../../style/molecules/Profile.scss"
import castorImage from "../../images/castor.jpg";

export default function Profile({user}) {
  const {level, experience, username} = user || {};

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
}