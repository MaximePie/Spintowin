import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Stopwatch from './Stopwatch';
import { viewportContext } from '../../contexts/viewport';
import UserType from '../../types/UserType';

type NavbarProps = {
  user: UserType,
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
              activeClassName="Navbar__link--active"
              className="Navbar__link"
              to="/"
              exact
            >
              <i className="fas fa-dumbbell" />
              {!isMobile && "S'entraîner"}
            </NavLink>
            <NavLink
              to="/review"
              className="Navbar__link"
              activeClassName="Navbar__link--active"
              exact
            >
              <i className="fas fa-book-open" />
              {!isMobile && 'Réviser'}
            </NavLink>
            <NavLink
              to="/add"
              className="Navbar__link"
              activeClassName="Navbar__link--active"
              exact
            >
              <i className="fas fa-plus" />
              {!isMobile && 'Ajouter'}
            </NavLink>
            <NavLink
              to="/stats"
              className="Navbar__link"
              activeClassName="Navbar__link--active"
              exact
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
              activeClassName="Navbar__link--active"
              exact
            >
              Se connecter
            </NavLink>
            <NavLink
              to="/register"
              className="Navbar__link"
              activeClassName="Navbar__link--active"
              exact
            >
              Créer un compte
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
