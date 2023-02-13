import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Stopwatch from './Stopwatch';
import { viewportContext } from '../../contexts/viewport';
import User from '../../types/User';

type NavbarProps = {
  user: User | undefined,
  logout: Function
}

export default function Navbar({ user, logout }: NavbarProps) {
  const { isMobile } = useContext(viewportContext);
  return (
    <div className="Navbar">
      {user && (
        <>
          <div className="Navbar__right">
            <NavLink
              className="Navbar__link"
              to="/train"
            >
              <i className="fas fa-dumbbell" />
              {!isMobile && "S'entraîner"}
            </NavLink>
            <NavLink
              to="/add"
              className="Navbar__link"
            >
              <i className="fas fa-plus" />
              {!isMobile && 'Ajouter'}
            </NavLink>
            <NavLink
              to="/stats"
              className="Navbar__link"
            >
              <i className="fas fa-chart-line" />
              {!isMobile && 'Stats'}
            </NavLink>
            {!isMobile && (
              <Stopwatch className="Navbar__stopwatch" />
            )}
          </div>
          <div className="Navbar__left">
            <button
              className="Navbar__link"
              onClick={() => logout()}
              type="button"
            >
              <i className="fas fa-sign-out-alt" />
              {!isMobile && 'Se déconnecter'}
            </button>
          </div>
        </>
      )}
      {!user && (
        <>
          <span />
          <div className="Navbar__left">
            <NavLink
              to="/login"
              className="Navbar__link"
            >
              Se connecter
            </NavLink>
            <NavLink
              to="/register"
              className="Navbar__link"
            >
              Créer un compte
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
