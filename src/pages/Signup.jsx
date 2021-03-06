import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

// design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Autocomplete,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import reg01 from "../img/reg_01.png";
import reg02 from "../img/reg_02.png";
import reg03 from "../img/reg_03.png";
import reg04 from "../img/reg_04.png";
import reg05 from "../img/reg_05.png";

// functions
import { register } from "../api/user";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // form functions that put the input values into the State

  const [username, setUsername] = useState("");
  const [firma, setFirma] = useState("");
  const [firmaWeb, setFirmaWeb] = useState("");
  const [firmaPozice, setFirmaPozice] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [budovatel, setBudovatel] = useState("");

  const [duvodyy, setDuvodyy] = useState([]);

  let data = duvodyy;
  const getValues = (e) => {
    let numbered = parseInt(e.target.value, 10);
    if (duvodyy.includes(numbered)) {
      data = data.filter((tick) => tick !== numbered);
      setDuvodyy(data);
      console.log(duvodyy);
      console.log("Value removed");
    } else {
      data.push(numbered);
      setDuvodyy(data);
      console.log(duvodyy);
      console.log("Value added");
    }
  };

  const [temaHlavni, setTemaHl] = useState("");
  const [temaDalsi, setTemaDal] = useState("");
  const [vzkaz, setVzkaz] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gdprSouhlas, setGdprSouhlas] = useState("");

  // password val'd
  let hasSixChar = password.length >= 6;
  let hasUpperChar = /(.*[A-Z].*)/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        referral,
        username,
        firma,
        firmaWeb,
        firmaPozice,
        email,
        telefon,
        linkedin,
        budovatel,
        duvodyy,
        temaHlavni,
        temaDalsi,
        vzkaz,
        password,
        gdprSouhlas,
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        //redirect the user
        navigate("/");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  // scroll functions
  const inputName = useRef(null);
  const inputCompany = useRef(null);
  const inputKontakty = useRef(null);
  const inputBuilder = useRef(null);
  const inputDuvody = useRef(null);
  const inputTemata = useRef(null);
  const inputVzkaz = useRef(null);
  const inputPass = useRef(null);

  // functions that scroll to the section

  const gotoName = () =>
    window.scrollTo({
      top: inputName.current.offsetTop,
      behavior: "smooth",
    });
  const gotoCompany = () =>
    window.scrollTo({
      top: inputCompany.current.offsetTop,
      behavior: "smooth",
    });
  const gotoKontakty = () =>
    window.scrollTo({
      top: inputKontakty.current.offsetTop,
      behavior: "smooth",
    });
  const gotoBuilder = () =>
    window.scrollTo({
      top: inputBuilder.current.offsetTop,
      behavior: "smooth",
    });
  const gotoDuvody = () =>
    window.scrollTo({
      top: inputDuvody.current.offsetTop,
      behavior: "smooth",
    });
  const gotoTemata = () =>
    window.scrollTo({
      top: inputTemata.current.offsetTop,
      behavior: "smooth",
    });
  const gotoVzkaz = () =>
    window.scrollTo({
      top: inputVzkaz.current.offsetTop,
      behavior: "smooth",
    });
  const gotoPass = () =>
    window.scrollTo({
      top: inputPass.current.offsetTop,
      behavior: "smooth",
    });

  const [referral, setReferral] = useState("");

  const [dataData, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/users`
        );
        console.log(res.data);
        setData(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    getUsers();
  }, []);

  // rendering the window

  return (
    <>
      <div className="r-container">
        <section id="reg-referral">
          <div className="loginform lcard">
            <h3>Kdo t?? doporu??il?</h3>

            <div className="form-group">
              <Autocomplete
                id="combo-box-demo"
                onChange={(event, value) => setReferral(value.username)}
                options={dataData}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                  <TextField {...params} label="Vyber doporu??itele" />
                )}
              />
            </div>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!referral}
                style={{ width: "100%" }}
                onClick={gotoName}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg01} alt="Group 1" />
          </div>
        </section>
        {/* end of the referal form */}

        <section id="reg-name" ref={inputName}>
          <div className="loginform lcard">
            <h3>Jak se jmenuje???</h3>

            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Jm??no"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!username}
                style={{ width: "100%" }}
                onClick={gotoCompany}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg02} alt="Group 2" />
          </div>
        </section>

        {/* end of the username form */}

        <section id="reg-company" ref={inputCompany}>
          <div className="loginform lcard">
            <h3>Koho reprezentuje???</h3>

            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Firma"
                value={firma}
                onChange={(e) => setFirma(e.target.value)}
              />
            </div>
            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Webov?? str??nky (nepovinn??)"
                value={firmaWeb}
                onChange={(e) => setFirmaWeb(e.target.value)}
              />
            </div>
            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Pozice"
                value={firmaPozice}
                onChange={(e) => setFirmaPozice(e.target.value)}
              />
            </div>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!firma}
                style={{ width: "100%" }}
                onClick={gotoKontakty}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg03} alt="Group 3" />
          </div>
        </section>

        {/* end of the company form */}

        <section id="reg-kontakty" ref={inputKontakty}>
          <div className="loginform lcard">
            <h3>Tv?? kontaktn?? ??daje?</h3>

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
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Telefon"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
              />
            </div>

            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="LinkedIn"
                value={linkedin}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!email}
                style={{ width: "100%" }}
                onClick={gotoBuilder}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg04} alt="Group 4" />
          </div>
        </section>

        {/* end of the kontakty form */}

        <section id="reg-builder" ref={inputBuilder}>
          <div className="loginform lcard">
            <h3>Buduje?? n??jakou komunitu?</h3>

            <div className="form-group">
              <FormLabel component="legend">
                Pokud ano, m????e?? zaregistrovat svoji komunitu pozd??ji
              </FormLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  value={budovatel}
                  onChange={(e) => setBudovatel(e.target.value)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Ano" />
                  <FormControlLabel value="2" control={<Radio />} label="Ne" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!budovatel}
                style={{ width: "100%" }}
                onClick={gotoDuvody}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg04} alt="Group 4" />
          </div>
        </section>

        {/* end of the budovatel form */}

        <section id="reg-duvody" ref={inputDuvody}>
          <div className="loginform lcard">
            <h3>Vyber alespo?? jednu mo??nost, pro?? se k n??m chce?? p??ipojit.</h3>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={1}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Chci zn??t hodnotu m?? komunity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={9}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="R??d bych z??skal/a sponzoring na rozvoj m?? komunity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={3}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Zva??uji svou komunitu prodat"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={4}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Chci koupit zaj??mav?? komunity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={5}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Chci sponzorovat zaj??mav?? komunity"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={11}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Hled??m intern??ho ??lov??ka na pozici Community ??i Brand Manager"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={12}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Hled??m agenturu ??i extern??ho specialistu na Community Development"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={10}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="R??d bych nab??dl/a sv?? slu??by v zaj??mav??ch komunit??ch"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={7}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Chci m??t p????stup k neve??ejn??m obchodn??m nab??dk??m a mo??nost je distribuovat"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={6}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="L??b?? se mi my??lenky a vize Jakuba Pacandy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    value={8}
                    onChange={(e) => getValues(e)}
                  />
                }
                label="Zat??m nev??m"
              />
            </FormGroup>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={gotoTemata}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg04} alt="Group 4" />
          </div>
        </section>

        {/* end of the duvody form */}

        <section id="reg-temata" ref={inputTemata}>
          <div className="loginform lcard">
            <h3>Co je aktu??ln?? tv?? hlavn?? t??ma?</h3>
            <FormLabel component="legend">
              T??ma, kter?? ti ve??er ned?? sp??t a r??no kv??li n??mu brzy vst??v????.
              T??ma, kter?? denn?? ??e?????? s ostatn??mi. Zkr??tka t??ma, kter?? je pro
              tebe te?? a tady nejd??le??it??j????. Pros??m vystihni ho jedn??m slovem
              ??i kr??tk??m souslov??m. Pokud jich ??e?????? v??c, uve?? dal???? n????e
            </FormLabel>
            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Hlavn?? t??ma"
                value={temaHlavni}
                onChange={(e) => setTemaHl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Dal???? t??ma"
                value={temaDalsi}
                onChange={(e) => setTemaDal(e.target.value)}
              />
            </div>

            <div className="text-center mt-4">
              <Button
                variant="contained"
                disabled={!temaHlavni}
                style={{ width: "100%" }}
                onClick={gotoVzkaz}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg04} alt="Group 4" />
          </div>
        </section>

        {/* end of the tema form */}

        <section id="reg-vzkaz" ref={inputVzkaz}>
          <div className="loginform lcard">
            <h3>Chce?? n??m p??ed vstupem do Genusia n??co vzk??zat?</h3>

            <div className="form-group">
              <TextField
                size="small"
                variant="outlined"
                className="form-control"
                label="Vzkaz"
                value={vzkaz}
                onChange={(e) => setVzkaz(e.target.value)}
              />
            </div>
            <div className="text-center mt-4">
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={gotoPass}
              >
                Pokra??ovat
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg04} alt="Group 4" />
          </div>
        </section>

        {/* end of the vzkaz form */}

        <section id="reg-pass" ref={inputPass}>
          <div className="loginform lcard">
            <h3>A kone??n??, nastav si heslo.</h3>

            <div className="form-group">
              <FormControl
                variant="outlined"
                size="small"
                className="form-control"
              >
                <InputLabel>Heslo</InputLabel>
                <OutlinedInput
                  label="Heslo"
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
              <div className="ml-1" style={{ columns: 2 }}>
                <div>
                  <small
                    className={hasSixChar ? "text-success" : "text-danger"}
                  >
                    Minim??ln?? 6 p??smen
                  </small>
                </div>
                <div>
                  <small
                    className={hasUpperChar ? "text-success" : "text-danger"}
                  >
                    Jedno velk?? p??smeno
                  </small>
                </div>
              </div>
            </div>

            <div className="form-group">
              <TextField
                size="small"
                type="password"
                variant="outlined"
                className="form-control"
                label="Potvrdit heslo"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password && confirmPassword && (
                <FormHelperText className="ml-1 mt-1">
                  {password === confirmPassword ? (
                    <span className="text-success">Heslo se shoduje</span>
                  ) : (
                    <span className="text-danger">Heslo se neshoduje!</span>
                  )}
                </FormHelperText>
              )}
            </div>
            <div className="mt-4">
              <FormLabel component="legend">
                Kliknut??m na tla????tko "Dokon??it" souhlas??te se zpracov??n??m
                osobn??ch ??daj?? a budete p??esm??rov??ni na osobn?? pozv??nku do na????
                Slack komunity, kde s v??mi budeme d??le komunikovat. Souhlas??te?
              </FormLabel>
              <FormControl fullWidth style={{ margin: "15px 0px" }}>
                <InputLabel id="demo-simple-select-label">
                  Pros??m vyberte mo??nost
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Pros??m vyberte mo??nost"
                  value={gdprSouhlas}
                  onChange={(e) => setGdprSouhlas(e.target.value)}
                >
                  <MenuItem value="1">Ano</MenuItem>
                  <MenuItem value="2">Ne</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                disabled={
                  !email ||
                  !password ||
                  !username ||
                  !referral ||
                  !confirmPassword ||
                  password !== confirmPassword ||
                  !hasUpperChar
                }
                style={{ width: "100%" }}
                onClick={handleRegister}
              >
                Dokon??it
              </Button>
            </div>
          </div>

          <div className="reg-pic">
            <img src={reg05} alt="Group05" />
          </div>
        </section>

        {/* end of the name form */}
      </div>
    </>
  );
};

export default Signup;
