import React, { useContext } from 'react';
import { CoinContext } from '../../../contexts/coin';
import coin from '../../../images/coin.png';

export default function Coin() {
  // get score and coordinates from PoppingScoreContext
  const { coordinates } = useContext(CoinContext);

  // randomly display the sparkles with a 20% chance
  return (
    <img
      className="Coin"
      style={{
        top: coordinates.y - 24,
        left: coordinates.x + 68,
      }}
      src={coin}
      alt="Ding !"
    />
  );
}
