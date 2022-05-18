import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="WelcomePage">
      <div className="WelcomePage__card">
        <h2>Bienvenue sur Eurêkard</h2>
        <div>
          <Link to="/login">Connectez-vous</Link>
          {' '}
          ou
          <Link to="/register">Créez un compte</Link>
        </div>
      </div>
    </div>
  );
}
