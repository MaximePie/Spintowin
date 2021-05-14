import React from "react";
import './App.css';
import Cards from "./components/Cards";
import AddCard from "./components/AddCard";
import Stopwatch from "./components/Stopwatch";
import {BrowserRouter, Switch, Route, NavLink} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <NavLink to='/' >S'entraîner</NavLink>
          <NavLink to='/add'>Ajouter</NavLink>
          <Stopwatch/>
        </div>
        <Switch>
          <Route path="/" component={Cards} exact/>
          <Route path="/add" component={AddCard}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
