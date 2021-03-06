// this is the window that opens when the admin katalog item is clicked

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FileBase64 from "react-file-base64";
import CloseIcon from "@mui/icons-material/Close";

const CommodalX = ({
  selectedKom,
  setSelectedImg,
  temata,
  kategorie,
  getMarketComms,
}) => {
  console.log(selectedKom);

  const checkArr1 = selectedKom.growthToolss;
  const checkArr2 = selectedKom.membershipPayment;

  const [newCommName, setNewCommName] = useState(selectedKom.communityname);
  const [newUniqValue, setNewUniqValue] = useState(selectedKom.uniqueValue);
  const [newFdgDate, setNewFdgDate] = useState(selectedKom.foundingDate);
  const [newMmbrCount, setNewMmbrCount] = useState(selectedKom.membersCount);
  const [newCommCate, setNewCommCate] = useState(selectedKom.commCategoriess);
  const [newCommSubtags, setNewCommSubtags] = useState(selectedKom.commSubtags);
  const [newOtherTools, setNewOthrTls] = useState(selectedKom.otherTools);
  const [image, setNewImage] = useState({ image: "" });
  const [newRegInt, setRegIntentionn] = useState(selectedKom.regIntentionn);
  const [newKatApproved, setKatApproved] = useState(selectedKom.katApproved);
  const [newMarketApproved, setMarketApproved] = useState(
    selectedKom.marketApproved
  );

  // checkboxes

  const [newMbrshipPmnt, setMembershipPayment] = useState(checkArr2);

  let dataM = newMbrshipPmnt;
  const getValue = (e) => {
    let numberedM = parseInt(e.target.value, 10);
    if (newMbrshipPmnt.includes(numberedM)) {
      dataM = dataM.filter((day) => day !== numberedM);
      setMembershipPayment(dataM);
      console.log(newMbrshipPmnt);
      console.log("The value is there already");
    } else dataM.push(numberedM);
    setMembershipPayment(dataM);
    console.log("Value added" + newMbrshipPmnt);
  };

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

  // setting new image

  const setNewImgBtn = (e) => {
    setNewImage(e.image);
    console.log(e.image);
  };

  // hide the modal

  const handleHideClick = (e) => {
    setSelectedImg(null);
    getMarketComms();
  };

  const onUpdate = (e) => {
    try {
      let komUpdate = e.target.value;
      console.log(komUpdate);
      console.log(newCommName);
      console.log(newUniqValue);
      axios.put(`${process.env.REACT_APP_API_URL}/communities/${komUpdate}`, {
        communityname: newCommName,
        uniqueValue: newUniqValue,
        foundingDate: newFdgDate,
        membersCount: newMmbrCount,
        commCategoriess: newCommCate,
        commSubtags: newCommSubtags,
        growthToolss: newGrowthTls,
        otherTools: newOtherTools,
        membershipPayment: newMbrshipPmnt,
        regIntentionn: newRegInt,
        katApproved: newKatApproved,
        marketApproved: newMarketApproved,
      });
      toast.success("Komunita upravena!");
    } catch (err) {}
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
                <img src={selectedKom.image} alt="think bigger!" />
                <div className="pic-upload">
                  <h5>Zde nahrajte obr??zek reprezentuj??c?? Va??i komunitu</h5>
                  <FormLabel component="legend">
                    Obr??zek ve form??tu 16:9, ne v??t????, jak 1 mb.
                  </FormLabel>
                  <div className="input-container">
                    <FileBase64
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setNewImgBtn({ image: base64 })}
                    />
                  </div>
                </div>
                {/* //-----------------------         */}
              </div>

              <div className="comm-desc">
                <h5 style={{ marginTop: "0px" }}>Jm??no komunity</h5>
                <TextField
                  fullWidth
                  id="filled-hidden-label-small"
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedKom.communityname}
                  value={newCommName}
                  onChange={(e) => setNewCommName(e.target.value)}
                />
                <h5>????m je komunita unik??tn???</h5>
                <TextField
                  id="outlined-textarea"
                  variant="standard"
                  placeholder={selectedKom.uniqueValue}
                  inputProps={{ maxLength: 200 }}
                  helperText={`${newUniqValue.length}/200`}
                  multiline
                  fullWidth
                  value={newUniqValue}
                  onChange={(e) => setNewUniqValue(e.target.value)}
                />

                <h5>
                  Rok zalo??en?? <i>(nepovinn??)</i>
                </h5>
                <TextField
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedKom.foundingDate}
                  value={newFdgDate}
                  onChange={(e) => setNewFdgDate(e.target.value)}
                />

                <h5>Aktu??ln?? po??et ??len??</h5>
                <TextField
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedKom.membersCount}
                  value={newMmbrCount}
                  onChange={(e) => setNewMmbrCount(e.target.value)}
                />

                <h5>Kategorie do kter??ch komunita spad??.</h5>

                <Autocomplete
                  multiple
                  onChange={(event, value) => setNewCommCate(value)}
                  id="tags-standard"
                  options={kategorie}
                  defaultValue={selectedKom.commCategoriess}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Vyberte kategorie"
                      placeholder="Kategorie"
                    />
                  )}
                />

                <h5>T??mata kter?? komunita ??e????.</h5>

                <Autocomplete
                  multiple
                  onChange={(event, value) => setNewCommSubtags(value)}
                  id="tags-standard"
                  options={temata}
                  defaultValue={selectedKom.commSubtags}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Vyberte t??ma"
                      placeholder="T??ma"
                    />
                  )}
                />

                <h5>
                  Jak?? komunitn?? n??stroje k budov??n?? komunity provozujete?
                </h5>

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
                    label="Mal?? re??ln?? setk??n?? do 30 lid??"
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
                    label="V??t???? akce od 30 do 200 ????astn??k??"
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
                    label="Konference ??i veletrhy nad 200 ????astn??k??"
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
                    label="Online meetingy p??es ZOOM, Google meet, Microsoft teams, aj"
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
                    label="Uzav??en?? diskusn?? f??rum na vlastn??m webu"
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
                    label="Facebook skupinu"
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
                    label="Linkedin skupinu"
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
                    label="Slack skupinu"
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
                    label="Discourse"
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
                    label="Messenger (hromadn?? chat se ??leny)"
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
                    label="Whatsapp (hromadn?? chat se ??leny)"
                  />
                </FormGroup>

                <h5>
                  Jin?? platformy <i>(nepovinn??)</i>
                </h5>
                <TextField
                  size="small"
                  variant="standard"
                  className="form-control"
                  placeholder={selectedKom.otherTools}
                  value={newOtherTools}
                  onChange={(e) => setNewOthrTls(e.target.value)}
                />

                <h5>Platby od ??len??.</h5>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={1}
                        defaultChecked={
                          checkArr2.includes(1) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getValue(e)}
                      />
                    }
                    label="Nevyb??r??m"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={2}
                        defaultChecked={
                          checkArr2.includes(2) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getValue(e)}
                      />
                    }
                    label="Jednor??zov?? platby (t??eba za vstupy na akce)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        value={3}
                        defaultChecked={
                          checkArr2.includes(3) ? "defaultChecked" : ""
                        }
                        onChange={(e) => getValue(e)}
                      />
                    }
                    label="Pravideln?? subscriptions ??i p??edplatn??"
                  />
                </FormGroup>

                <h5>M?? z??jem o:</h5>
                <FormControl
                  fullWidth
                  style={{ margin: "15px 0px" }}
                  variant="standard"
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={newRegInt}
                    value={newRegInt}
                    onChange={(e) => setRegIntentionn(e.target.value)}
                  >
                    <MenuItem value="1">Pouze vlo??en?? do katalogu</MenuItem>
                    <MenuItem value="2">Z??sk??n?? sponzora komunity</MenuItem>
                    <MenuItem value="3">Prodej komunity</MenuItem>
                    <MenuItem value="4">Sponzoring i prodej komunity</MenuItem>
                    <MenuItem value="5">Nez??vazn?? ohodnocen?? komunity</MenuItem>
                  </Select>
                </FormControl>

                <h5>Schv??len?? skupiny do katalogu:</h5>
                <FormControl
                  fullWidth
                  style={{ margin: "15px 0px" }}
                  variant="standard"
                >
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Mo??nost"
                    value={newKatApproved}
                    onChange={(e) => setKatApproved(e.target.value)}
                  >
                    <MenuItem value={false}>Neschv??lena</MenuItem>
                    <MenuItem value={true}>Schv??lena</MenuItem>
                  </Select>
                </FormControl>

                <h5>Schv??len?? skupiny do marketplacu:</h5>
                <FormControl
                  fullWidth
                  style={{ margin: "15px 0px" }}
                  variant="standard"
                >
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Mo??nost"
                    value={newMarketApproved}
                    onChange={(e) => setMarketApproved(e.target.value)}
                  >
                    <MenuItem value={false}>Neschv??lena</MenuItem>
                    <MenuItem value={true}>Schv??lena</MenuItem>
                  </Select>
                </FormControl>

                {/* // save button below */}
                <Button
                  style={{ height: "28px", width: "100%", marginTop: "25px" }}
                  variant="contained"
                  color="success"
                  onClick={onUpdate}
                  value={selectedKom._id}
                >
                  Ulo??it ??pravy
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

export default CommodalX;
