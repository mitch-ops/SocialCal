import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Calendar from './components/Calendar';
import CreateActivity from './components/CreateActivity';
import Friends from './components/Friends';
import TabBar from './components/TabBar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <TabBar />
        <Switch>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <PrivateRoute path="/calendar" Component={Calendar} />
          <PrivateRoute path="/create" Component={CreateActivity} />
          <PrivateRoute path="/friends" Component={Friends} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
