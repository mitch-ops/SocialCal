import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import CreateActivity from './pages/CreateActivity';
import Friends from './pages/Friends';
import TabBar from './components/TabBar';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <TabBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<PrivateRoute component={Calendar} />} />
        <Route path="/create" element={<PrivateRoute component={CreateActivity} />} />
        <Route path="/friends" element={<PrivateRoute component={Friends} />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;