import Footer from "../components/Footer"
import Header from "../components/Header"
import {useContext, useEffect} from "react";
import {UserContext} from "../UserContext"
import axios from "axios";

const UserProfile = () => {

    const { user, setUser} = useContext(UserContext);
    console.log(user);

    return (
        <>
        <Header />
        <div className="up-container">
            <div className="up-grid">
            <div className="up-card">
            <img src={user.user.profilePict} alt="profile"/>
            <h4>{user.user.username}</h4>
            <h4>{user.user.firma}</h4>
            
            Trocha informací o uživateli!
            </div>
            <div className="up-content">
                Obsah!
            </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default UserProfile
