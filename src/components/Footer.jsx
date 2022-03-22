import logotext from "../img/glogo_foot.png";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
      <footer>
    <div className="footer-bg">
      <div className="container-ft">
        <img src={logotext} alt="Logo" style={{ width: "220px", marginBottom:"50px" }} />
        <ul className="flex-row">
          <li>
            <a href="#aboutus">O nás</a>
          </li>
          <li>
            <a href="#guides">Návody</a>
          </li>
          <li>
            <a href="#services">Služby</a>
          </li>
          <li>
            <a href="#team">Náš tým</a>
          </li>
          <li>
            <a href="#contact-us">Napište nám</a>
          </li>
        </ul>
        <ul className="flex-row">
          <li>
            <i><FontAwesomeIcon icon={faFacebook} className="hovered"></FontAwesomeIcon></i>    
          </li>
          <li>
          <i><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></i>    
          </li>
          <li>
          <i><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></i>    
          </li>
          <li>
          <i><FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon></i>    
          </li>
          <li>
          <i><FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon></i>    
          </li>
        </ul>
        <p>&copy; 2021 Wuwej Community s.r.o.</p>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
