import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import CreateActivity from './pages/CreateActivity';
import Friends from './pages/Friends';
import TabBar from './pages/TabBar';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

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
          <Route path="*" Component={<NotFound />}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
