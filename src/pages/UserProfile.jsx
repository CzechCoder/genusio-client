import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const slicedRegister = user.user.createdAt.slice(0, -14);

  return (
    <>
      <Header />
      <div className="up-container">
        <div className="up-grid">
          <div className="up-card">
            <img src="https://genusio.com/img/blank.jpg" alt="profile" />
            <h4>{user.user.username}</h4>
            <h5>{user.user.firma}</h5>
            {user.user.firmaPozice}
          </div>
          <div className="up-content">
            <p>Telefon</p>
            {user.user.telefon}
            <p>Email</p>
            {user.user.email}
            <p>LinkedIn</p>
            {user.user.linkedin}
            <p>Web</p>
            {user.user.firmaWeb}
            <p>Datum registrace</p>
            {slicedRegister}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
