// this is the window that opens when the admin katalog item is clicked

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const CommodalU = ({ selectedUser, setSelectedUser, refreshUsers }) => {
  console.log(selectedUser);

  const [newUserName, setNewUserName] = useState(selectedUser.username);
  const [newReferral, setNewReferral] = useState(selectedUser.referral);
  const [newFirma, setNewFirma] = useState(selectedUser.firma);
  const [newFirmaWeb, setNewFirmaWeb] = useState(selectedUser.firmaWeb);
  const [newFirmaPozice, setNewFirmaPozice] = useState(
    selectedUser.firmaPozice
  );
  const [newEmail, setNewEmail] = useState(selectedUser.email);
  const [newTelefon, setNewTelefon] = useState(selectedUser.telefon);
  const [newLinkedin, setNewLinkedin] = useState(selectedUser.linkedin);
  const [newBudovatel, setNewBudovatel] = useState(selectedUser.budovatel);

  const [newTemaHlavni, setNewTemaHlavni] = useState(selectedUser.temaHlavni);
  const [newTemaDalsi, setNewTemaDalsi] = useState(selectedUser.temaDalsi);
  const [newVzkaz, setNewVzkaz] = useState(selectedUser.vzkaz);

  const checkArr1 = selectedUser.duvodyy;

  // hide the modal

  const handleHideClick = (e) => {
    setSelectedUser(null);
    refreshUsers();
  };

  const onUpdate = (e) => {
    try {
      let userUpdate = e.target.value;
      console.log(userUpdate);
      console.log(newUserName);
      axios.put(`${process.env.REACT_APP_API_URL}/user/${userUpdate}`, {
        referral: newReferral,
        username: newUserName,
        firma: newFirma,
        firmaWeb: newFirmaWeb,
        firmaPozice: newFirmaPozice,
        email: newEmail,
        telefon: newTelefon,
        linkedin: newLinkedin,
        budovatel: newBudovatel,
        duvodyy: newGrowthTls,
        temaHlavni: newTemaHlavni,
        temaDalsi: newTemaDalsi,
        vzkaz: newVzkaz,
      });
      toast.success("Uživatel upraven!");
    } catch (err) {}
  };

  // duvody

  const [newGrowthTls, setGrowthToolss] = useState(checkArr1);

  let dataT = newGrowthTls;
  const getToolsValue = (e) => {
    let numberedT = parseInt(e.target.value, 10);
    if (newGrowthTls.includes(numberedT)) {
      dataT = dataT.filter((tool) => tool !== numberedT);
      setGrowthToolss(dataT);
      console.log(newGrowthTls);
      console.log("The value is there already");
    } else dataT.push(numberedT);
    setGrowthToolss(dataT);
    console.log("Value added" + newGrowthTls);
  };

  return (
    <>
      <div className="basemodal">
        <div className="modalwrapper">
          <div className="main-content">
            <div className="mod-topbar">
              <CloseIcon onClick={handleHideClick} className="close-it" />
            </div>
            <div className="comm-grid">
              <div className="image-part">
                <img
                  src="https://genusio.com/img/blank.jpg"
                  alt="think bigger!"
                />
                <div className="pic-upload">
                  <div className="input-container"></div>
                </div>
                {/* //-----------------------         */}
              </div>

              <div className="comm-desc">
                <h5 style={{ marginTop: "0px" }}>Doporučitel</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.referral}
                  value={newReferral}
                  onChange={(e) => setNewReferral(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Jméno</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.username}
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Firma</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.firma}
                  value={newFirma}
                  onChange={(e) => setNewFirma(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Web firmy</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.firmaWeb}
                  value={newFirmaWeb}
                  onChange={(e) => setNewFirmaWeb(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Pozice ve firmě</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.firmaPozice}
                  value={newFirmaPozice}
                  onChange={(e) => setNewFirmaPozice(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Email</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.email}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Telefon</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.telefon}
                  value={newTelefon}
                  onChange={(e) => setNewTelefon(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>LinkedIn</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.linkedin}
                  value={newLinkedin}
                  onChange={(e) => setNewLinkedin(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Budovatel komunity?</h5>
                <div className="form-group">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="controlled-radio-buttons-group"
                      value={newBudovatel}
                      onChange={(e) => setNewBudovatel(e.target.value)}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Ano"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Ne"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <h5>Proč se chce připojit?</h5>

                <p id="demo"></p>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={1}
                        defaultChecked={
                          checkArr1.includes(1) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Chci znát hodnotu mé komunity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={2}
                        defaultChecked={
                          checkArr1.includes(2) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Rád bych získal/a sponzoring na rozvoj mé komunity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={3}
                        defaultChecked={
                          checkArr1.includes(3) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Zvažuji svou komunitu prodat"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={4}
                        defaultChecked={
                          checkArr1.includes(4) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Chci koupit zajímavé komunity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={5}
                        defaultChecked={
                          checkArr1.includes(5) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Chci sponzorovat zajímavé komunity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={6}
                        defaultChecked={
                          checkArr1.includes(6) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Hledám interního člověka na pozici Community či Brand Manager"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={7}
                        defaultChecked={
                          checkArr1.includes(7) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Hledám agenturu či externího specialistu na Community Development"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={8}
                        defaultChecked={
                          checkArr1.includes(8) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Rád bych nabídl/a své služby v zajímavých komunitách"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={9}
                        defaultChecked={
                          checkArr1.includes(9) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Chci mít přístup k neveřejným obchodním nabídkám a možnost je distribuovat"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={10}
                        defaultChecked={
                          checkArr1.includes(10) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Líbí se mi myšlenky a vize Jakuba Pacandy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={11}
                        defaultChecked={
                          checkArr1.includes(11) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getToolsValue(e)}
                      />
                    }
                    label="Zatím nevím"
                  />
                </FormGroup>

                <h5 style={{ marginTop: "0px" }}>Hlavní téma</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.temaHlavni}
                  value={newTemaHlavni}
                  onChange={(e) => setNewTemaHlavni(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Další téma</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.temaDalsi}
                  value={newTemaDalsi}
                  onChange={(e) => setNewTemaDalsi(e.target.value)}
                />

                <h5 style={{ marginTop: "0px" }}>Vzkaz</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedUser.vzkaz}
                  value={newVzkaz}
                  onChange={(e) => setNewVzkaz(e.target.value)}
                />

                {/* // save button below */}
                <Button
                  style={{ height: "28px", width: "100%", marginTop: "25px" }}
                  variant="contained"
                  color="success"
                  onClick={onUpdate}
                  value={selectedUser._id}
                >
                  Uložit úpravy
                </Button>
              </div>
            </div>
          </div>
          <div className="closer" onClick={handleHideClick}></div>
        </div>
      </div>
    </>
  );
};

export default CommodalU;
