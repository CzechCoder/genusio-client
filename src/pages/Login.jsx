import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import glogo from "../img/glogo_login.png";

// design

import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// functions

import { login } from "../api/user";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        setUser(res);
        console.log(res.user);
        console.log(res.user.email);
        console.log(res.user.isAdmin);

        // redirect to homepaage
        navigate("/katalog");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/registrace");
  };

  return (
    <>
      <div className="l-container">
        <div className="login-pic">
          <img
            src={glogo}
            alt="Login"
            style={{
              transform: "perspective(683px), rotateX(5deg), rotateY(331deg)",
            }}
          />
        </div>
        <div className="loginform lcard">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <FormControl
                variant="outlined"
                size="small"
                className="form-control"
              >
                <InputLabel>Heslo</InputLabel>
                <OutlinedInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                onClick={handleLogin}
                style={{ width: "100%", height: "50px" }}
              >
                P??ihl??sit se
              </Button>
            </div>
          </form>

          <Link
            className="nav-link"
            to="/pwrecover"
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              color: "blue",
              fontWeight: 500,
            }}
          >
            Obnovit heslo
          </Link>

          <div className="text-center mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={handleSignup}
              style={{ width: "100%", height: "50px" }}
            >
              Registrovat se
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
