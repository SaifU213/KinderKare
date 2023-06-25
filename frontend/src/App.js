import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomePage, OwnerLogin, ParentLogin, StaffLogin, Startpage, OwnerRegister, ParentRegister } from './pages';

import './App.css';

function App() {
  // Active menu closes the menu and slides it to t
  const location = useLocation();
  const [user, setLoginUser] = useState({});
  let showhome = false;

  if (location.pathname === '/ParentRegister' || location.pathname === '/ParentLogin' || location.pathname === '/OwnerLogin' || location.pathname === '/StaffLogin' || location.pathname === '/OwnerRegister' || location.pathname === '/') {
    showhome = false;
  } else {
    showhome = true;
  }

  return (
    <div>
      <Startpage location={location} />
      <OwnerLogin location={location} setLoginUser={setLoginUser} />
      <StaffLogin location={location} setLoginUser={setLoginUser} />
      <ParentLogin location={location} setLoginUser={setLoginUser} />
      <OwnerRegister location={location} />
      <ParentRegister location={location} />
      {showhome && <HomePage location={location} />}
    </div>
  );
}

export default App;
