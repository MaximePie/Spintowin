import React, { useEffect, useState } from 'react';
import { getFromServer } from '../../services/server';
import Badge from './Badge';
import BadgeType from '../../types/BadgeType';

type BadgeInList = {
  badge: BadgeType,
  current: number,
  required: number,
}

export default function Badges() {
  const [badges, setBadges] = useState<BadgeInList[]>([]);
  useEffect(fetchBadges, []);

  return (
    <div className="Badges">
      {badges.map((badgeData) => (
        <Badge
          badge={badgeData.badge}
          current={badgeData.current}
          required={badgeData.required}
        />
      ))}
    </div>
  );

  function fetchBadges() {
    getFromServer('/users/connectedUser/badges').then((response) => {
      setBadges(response.data);
    });
  }
}
