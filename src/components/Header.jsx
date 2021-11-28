import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import {UserContext} from "../UserContext"
import logohead from "../img/glogo_transp.png";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';


// functions
import {logout} from "../api/user"
import { Button, ListItem, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StoreIcon from '@mui/icons-material/Store';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupsIcon from '@mui/icons-material/Groups';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout().then((res) => {
      toast.success(res.message);
      setUser(null);
      //redirect
      navigate("/");
    }).catch((err) => console.log(err));
  };

  const strWuwej = "https://www.jakubpacanda.cz/wuwejcommunity-pozvanka";

  // drawer function

  
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

// list start

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      <ListItem style={{justifyContent:"center"}}>{user}</ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key={0}>
      <ListItemIcon><ListAltIcon/></ListItemIcon>
      <Link className="nav-link active" to="/katalog">
              Katalog
            </Link>
      </ListItem>
      <ListItem button key={8}>
      <ListItemIcon><AccountBoxIcon/></ListItemIcon>
      <Link className="nav-link active" to="/userprofile">
              Můj profil
            </Link>
      </ListItem>
      <ListItem button key={8}>
      <ListItemIcon><GroupsIcon/></ListItemIcon>
      <Link className="nav-link active" to="/mycommunities">
              Moje komunity
            </Link>
      </ListItem>
      <ListItem button key={8}>
      <ListItemIcon><AddIcon/></ListItemIcon>
      <Link className="nav-link active" to="/pridatkomunitu">
              Přidat komunitu
            </Link>
      </ListItem>
      <ListItem button key={8}>
      <ListItemIcon><StoreIcon/></ListItemIcon>
      <Link className="nav-link active" to="/marketplace">
              Community Marketplace
            </Link>
      </ListItem>
      <ListItem button key={8}>
      <ListItemIcon><LogoutIcon/></ListItemIcon>
      <Link className="nav-link active" to="/" onClick={handleLogout}>
              Logout
            </Link>
      </ListItem>

    </List>
  </Box>
);


// list end
  return (
    <div className="bg-primary">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary h-container">
      
      <Link className="navbar-brand" to="/katalog">
      <img src={logohead} alt="Logo" style={{ width: "180px" }} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        {!user ? (
        <>
          <li className="nav-item active">
            <Link className="nav-link" to="/registrace">
              Registrovat
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Přihlásit
            </Link>
          </li>
</>) : (  <>

  <li className="nav-item active">
  <a href="https://www.jakubpacanda.cz/wuwejcommunity-pozvanka" target="_blank">Wuwej Community</a>
          </li>
          
{/* drawer start */}

<div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon style={{color:"white"}}/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>

{/* drawer end */}

          </>
)}
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Header;