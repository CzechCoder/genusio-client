import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {UserContext} from "./UserContext"
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './addons.css';
import './custom.scss';
import './katalog.scss';

// componentz
import Signup from './pages/Signup';
import Login from './pages/Login';
import Katalog from './pages/Katalog';
import Pridatkomunitu from "./pages/Pridatkomunitu";

// functions
import {getUser} from "./api/user";
import PwRecover from './pages/PwRecover';
import PridatImage from './pages/PridatImage';
import UserProfile from './pages/UserProfile';
import MyCommunities from './pages/MyCommunities';
import Marketplace from './pages/Marketplace';

function App() {
const [user, setUser] = useState(null);

// anti-refresh

useEffect(() => {
  const unsubscribe = getUser().then((res)=> {
    if(res.error) toast(res.error);
    else setUser(res.username);
  }).catch((err) => toast(err));

return () => unsubscribe;

}, []);

// render

  return (
    <div>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
        <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={user ? <Katalog/> : <Signup/>}/>
        <Route exact path="/katalog" element={<Katalog/>}/>
        <Route exact path="/marketplace" element={<Marketplace/>}/>
        <Route exact path="/pridatkomunitu" element={<Pridatkomunitu/>}/>
        <Route exact path="/pridatimage" element={<PridatImage/>}/>
        <Route exact path="/registrace" element={<Signup/>}/>
        <Route exact path="/userprofile" element={<UserProfile/>}/>
        <Route exact path="/mycommunities" element={<MyCommunities/>}/>
        <Route exact path="/pwrecover" element={<PwRecover/>}/>
      </Routes>
      </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
