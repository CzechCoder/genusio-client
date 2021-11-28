import React, { useState } from "react";
import { toast } from "react-toastify";
import FileBase64 from 'react-file-base64';

// design

import {
  TextField,
  FormControl,
  InputLabel,
  Button,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

// functions
import { registerComm } from "../api/community";
import { Box } from "@mui/system";

const RegCommunity = () => {
  const navigate = useNavigate();

const commTagsArr = ['téma není v seznamu', 'byznys', 'volný čas', "sport", "outdoor", "indoor", "camping", "cestování", "networking", "mazlíčci", "auta", "motorky", "aktivismus", "ekologie", "zdraví"];

  // form for community
  const [communityname, setCommName] = useState("");
  const [foundingDate, setFoundingDate] = useState("");
  const [membersCount, setMembersCount] = useState("");
  const [regIntentionn, setRegIntentionn] = useState("");
  const [commCategoriess, setCommCategoriess] = useState([]);
  let dataC=commCategoriess;


  /*
  const getToolsValue=(e)=> {
    let numberedT = parseInt(e.target.value, 10)
    if (growthToolss.includes(numberedT)) {
      dataT = dataT.filter(tool => tool !== numberedT)
      setGrowthToolss(dataT)
      console.log(growthToolss)
      console.log("The value is there already")
    } else
    dataT.push(numberedT) 
    setGrowthToolss(dataT)
    console.log("Value added" + growthToolss)
  }
  */

  const [growthToolss, setGrowthToolss] = useState([]);
  let dataT=growthToolss;
  const getToolsValue=(e)=> {
    let numberedT = parseInt(e.target.value, 10)
    if (growthToolss.includes(numberedT)) {
      dataT = dataT.filter(tool => tool !== numberedT)
      setGrowthToolss(dataT)
      console.log(growthToolss)
      console.log("The value is there already")
    } else
    dataT.push(numberedT) 
    setGrowthToolss(dataT)
    console.log("Value added" + growthToolss)
  }

  const [otherTools, setOtherTools] = useState("");
  const [uniqueValue, setUniqueValue] = useState("");
  
    const [membershipPayment, setMembershipPayment] = useState([]);
    let dataM=membershipPayment;
    const getValue=(e)=> {
      let numberedM = parseInt(e.target.value, 10)
      if (membershipPayment.includes(numberedM)) {
        dataM = dataM.filter(day => day !== numberedM)
        setMembershipPayment(dataM)
        console.log(membershipPayment)
        console.log("The value is there already")
      } else
      dataM.push(numberedM) 
      setMembershipPayment(dataM)
      console.log("Value added" + membershipPayment)
    }
  
  const [image, setImage] = useState({ image: '' });

  //--------- set Item / image

  const setImageButton = (e) => {
    setImage(e.image)
    console.log(e.image)
  } 

  //--------- end of set Item

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerComm({
        communityname,
        uniqueValue,
        image,
        foundingDate,
        membersCount,
        commCategoriess,
        growthToolss,
        otherTools,
        membershipPayment,
        regIntentionn        
      });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        //redirect the user
        navigate("/katalog");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // rendering the window

  return (
    <div className="r-r-container">
      <div className="r-container">
        <section id="commreg">
          <div className="commregform lcard">
            <h3>Přidej k nám svoji komunitu!</h3>
{/* pasted */}
            <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      noValidate
      autoComplete="off"
    >

<div className="form-group">
            <h5>Název komunity</h5>
              <TextField
                fullWidth 
                id="filled-hidden-label-small"
                size="small"
                variant="standard"
                className="form-control"
                value={communityname}
                onChange={(e) => setCommName(e.target.value)}
              />

<h5>Čím je komunita unikátní?</h5>
            <FormLabel component="legend">Vypíchněte největší užitky vaší komunity. Buďte konkrétní a myslete na detaily. Max 200 znaků.</FormLabel>
            <TextField
          id="outlined-textarea"
          variant="standard"
          inputProps={{ maxLength: 200 }}
          helperText={`${uniqueValue.length}/200`}
          multiline
          fullWidth
          value={uniqueValue}
          onChange={(e) => setUniqueValue(e.target.value)}
        />

        {/* //----image upload---- */}

<h5>Zde nahrajte obrázek reprezentující Vaši komunitu</h5>
<FormLabel component="legend">Obrázek ve formátu 16:9, ne větší, jak 1 mb.</FormLabel>

<div className="input-container">
      {/* <pre>{JSON.stringify(item, null, '\t')}</pre> */}
      
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImageButton({ image: base64 })}
        />
      </div>

{/* //-----------------------         */}

            <h5>Rok založení <i>(nepovinné)</i></h5>
              <TextField
                size="small"
                variant="standard"
                className="form-control"
                value={foundingDate}
                onChange={(e) => setFoundingDate(e.target.value)}
              />

            <h5>Aktuální počet členů</h5>
              <TextField
                size="small"
                variant="standard"
                className="form-control"
                value={membersCount}
                onChange={(e) => setMembersCount(e.target.value)}
              />

            <h5>Vyberte minimálně jedno nosné téma Vaší komunity.</h5>
            
      <Autocomplete
        multiple
        onChange={(event, value) => setCommCategoriess(value)}
        id="tags-standard"
        options={commTagsArr}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Vyberte témata"
            placeholder="Téma"
          />
        )}
      />

<h5>Jaké komunitní nástroje k budování komunity provozujete?</h5>

<FormLabel component="legend">Nástroje musí být diskusního (nikoli reklamního) charakteru. Například firemní stránka na Facebooku je reklamního charakteru. Komunikace je obvykle jednosměrná od vlastníka směrem ke sledujícím odběratelům. Narozdíl od toho Facebook skupina je nástroj, kde se členové mohou sdružovat, diskutvat a propojovat se spolu i bez účasti lídra. Samozřejmně i osobní setkání, eventy a konference se počítají.</FormLabel>
  
<FormGroup>
<FormControlLabel control={<Checkbox color="secondary" value={1} onChange={(e)=>getToolsValue(e)} />} label="Malá reálná setkání do 30 lidí" />
<FormControlLabel control={<Checkbox color="secondary" value={2} onChange={(e)=>getToolsValue(e)} />} label="Větší akce od 30 do 200 účastníků" />
<FormControlLabel control={<Checkbox color="secondary" value={3} onChange={(e)=>getToolsValue(e)} />} label="Konference či veletrhy nad 200 účastníků" />              
<FormControlLabel control={<Checkbox color="secondary" value={4} onChange={(e)=>getToolsValue(e)} />} label="Online meetingy přes ZOOM, Google meet, Microsoft teams, aj" />              
<FormControlLabel control={<Checkbox color="secondary" value={5} onChange={(e)=>getToolsValue(e)} />} label="Uzavřené diskusní fórum na vlastním webu" />              
<FormControlLabel control={<Checkbox color="secondary" value={6} onChange={(e)=>getToolsValue(e)} />} label="Facebook skupinu" />              
<FormControlLabel control={<Checkbox color="secondary" value={7} onChange={(e)=>getToolsValue(e)} />} label="Linkedin skupinu" />              
<FormControlLabel control={<Checkbox color="secondary" value={8} onChange={(e)=>getToolsValue(e)} />} label="Slack skupinu" />              
<FormControlLabel control={<Checkbox color="secondary" value={9} onChange={(e)=>getToolsValue(e)} />} label="Discourse" />              
<FormControlLabel control={<Checkbox color="secondary" value={10} onChange={(e)=>getToolsValue(e)} />} label="Messenger (hromadný chat se členy)" />              
<FormControlLabel control={<Checkbox color="secondary" value={11} onChange={(e)=>getToolsValue(e)} />} label="Whatsapp (hromadný chat se členy)" />              
</FormGroup>

<h5>Nenašli jste Vaši oblíbenou platformu v našem seznamu? Dejte nám tip na doplnění. <i>(nepovinné)</i></h5>
              <TextField
                size="small"
                variant="standard"
                className="form-control"
                value={otherTools}
                onChange={(e) => setOtherTools(e.target.value)}
              />

<h5>Vybíráte nějaké platby od členů? Vyberte kterou formou.</h5>
            <FormGroup>
            <FormControlLabel control={<Checkbox color="secondary" value={1} onChange={(e)=>getValue(e)} />} label="Nevybírám" />
            <FormControlLabel control={<Checkbox color="secondary" value={2} onChange={(e)=>getValue(e)} />} label="Jednorázové platby (třeba za vstupy na akce)" />
            <FormControlLabel control={<Checkbox color="secondary" value={3} onChange={(e)=>getValue(e)}/>} label="Pravidelná subscriptions či předplatné" />              
            </FormGroup>

  <h5>Mám zájem o:</h5>
      <FormControl fullWidth style={{margin: "15px 0px"}}>
  <InputLabel id="demo-simple-select-label">Prosím vyberte možnost</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Prosím vyberte možnost"
    value={regIntentionn}
    onChange={(e)=> setRegIntentionn(e.target.value)}
  >
    <MenuItem value="1">Pouze vložení do katalogu</MenuItem>
    <MenuItem value="2">Získání sponzora komunity</MenuItem>
    <MenuItem value="3">Prodej komunity</MenuItem>
    <MenuItem value="4">Sponzoring i prodej komunity</MenuItem>
    <MenuItem value="5">Nezávazné ohodnocení komunity</MenuItem>
  </Select>
</FormControl>

              <Button
                variant="contained"
                disabled={
                  !communityname || !membersCount
                }
                style={{ width: "100%" }}
                onClick={handleRegister}
              >
                Dokončit
              </Button>
            </div> 
</Box>
          </div>
            
          {/* closing of the whole form */}
          
        </section>

        {/* end of the section */}
      </div>
    </div>
  );
};

export default RegCommunity;
