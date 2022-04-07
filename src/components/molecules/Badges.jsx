import React, {useEffect, useState} from 'react';
import {getFromServer} from "../../services/server";
import Badge from "./Badge";

export default function Badges() {
  const [badges, setBadges] = useState([]);
  useEffect(fetchBadges, []);

  return (
    <div className="Badges">
      {badges.map(badgeData => (
        <Badge
          badge={badgeData.badge}
          current={badgeData.current}
          required={badgeData.required}
        />
      ))}
    </div>
  );

  function fetchBadges() {
    getFromServer("/users/connectedUser/badges").then(response => {
      setBadges(response.data);
    })
  }
}
