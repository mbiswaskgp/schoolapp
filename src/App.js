import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import './App.css';
import Admin from './Components/Admin/Admin';
import TutorDashboard from './Components/Tutor/TutorDashboard';

import Login from "./Components/Auth/Login";

import { AdminRoute } from "./Components/Common/AdminRoute";
import { TutorRoute } from "./Components/Common/TutorRoute";

import { history } from './helpers/history';
const App = () => {
  return (
    <div className="App" id="wrapper">
      <Router history={history}>
        <Switch>        
          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>
          {/* <TutorRoute path="/tutor">
            <TutorDashboard />
          </TutorRoute> */}
          <Route path={["/","/login"]}><Login /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
