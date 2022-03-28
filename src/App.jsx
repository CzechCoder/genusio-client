import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {UserContext} from "./UserContext"
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import './addons.css';
import './custom.scss';
import './katalog.scss';

// components

import Signup from './pages/Signup';
import Login from './pages/Login';
import Katalog from './pages/Katalog';
import Pridatkomunitu from "./pages/Pridatkomunitu";

// functions

import {getUser} from "./api/user";

// pages

import PwRecover from './pages/PwRecover';
import UserProfile from './pages/UserProfile';
import Marketplace from './pages/Marketplace';
import AdminSekce from './pages/AdminSekce';
import TagyInput from './pages/TagyNew';
import KategorieInput from './pages/KategorieNew';
import {CommsProvider} from './api/communities';


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
      <CommsProvider>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
        <ToastContainer autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false}/>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={user ? <Katalog/> : <Signup/>}/>
        <Route exact path="/katalog" element={<Katalog/>}/>
        <Route exact path="/marketplace" element={<Marketplace/>}/>
        <Route exact path="/pridatkomunitu" element={<Pridatkomunitu/>}/>
        <Route exact path="/registrace" element={<Signup/>}/>
        <Route exact path="/userprofile" element={<UserProfile/>}/>
        <Route exact path="/pwrecover" element={<PwRecover/>}/>
        <Route exact path="/adminsekce" element={<AdminSekce/>}/>
        <Route exact path="/tagy" element={<TagyInput/>}/>
        <Route exact path="/kategorie" element={<KategorieInput/>}/>
      </Routes>
      </UserContext.Provider>
      </Router>
      </CommsProvider>
    </div>
  );
}

export default App;
