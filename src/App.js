import React from "react";
import './App.css';
import Cards from "./components/Cards";
import AddCard from "./components/AddCard";
import Stopwatch from "./components/Stopwatch";
import Stats from "./components/Stats";
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Navbar">
          <NavLink
            activeClassName="Navbar__link--active"
            className="Navbar__link"
            to='/'
            exact
          >
            🥋 S'entraîner
          </NavLink>
          <NavLink
            to='/add'
            className="Navbar__link"
            activeClassName="Navbar__link--active"
            exact
          >
            ➕ Ajouter
          </NavLink>
          <NavLink
            to='/stats'
            className="Navbar__link"
            activeClassName="Navbar__link--active"
            exact
          >
            🤔 Stats
          </NavLink>
          <Stopwatch className="Navbar__stopwatch" />
        </div>
        <Switch>
          <Route path="/" component={Cards} exact/>
          <Route path="/add" component={AddCard}/>
          <Route path="/stats" component={Stats}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
