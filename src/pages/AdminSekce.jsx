import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import CommodalX from '../components/ModalX';
import CommodalU from '../components/ModalU';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import Group from '@mui/icons-material/Group';
import {UserContext} from "../UserContext"
import { toast } from "react-toastify";
import TagsInput from '../components/TagsInput';

const AdminSekce = () => {

    const [communities, setCommunities] = useState([]);
    const [userList, setUsers] = useState([]);
    const [temata, setTemataList] = useState([]);
    const [kategorie, setCatsList] = useState([]);
   
    const [selectedKom, setSelectedImg] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const { user} = useContext(UserContext);

    const [catsListId, setCatsListId] = useState("");
    const [cats, setCats] = useState([]);

    const [tagListId, setTagListId] = useState("");
    const [tags, setTags] = useState([]);

    const [errors, setErrors] = useState({});
    const [emails, setEmails] = useState([]);

      // obnovuje komunity

    const refreshComms = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/communities`);
        setCommunities(res.data);
    } catch (err) {}
  };

      // obnovuje uzivatele

    const refreshUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/users`);
        setUsers(res.data);
    } catch (err) {}
  };

    useEffect(() => {

        // stahuje komunity

        const getComms = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/communities`);
                setCommunities(res.data);
                // console.log(res)
            } catch (err) {}
        };
        getComms();

        // stahuje uzivatele

        const getUsers = async () => {
          try {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/users`);
              setUsers(res.data);
              console.log(res)
          } catch (err) {}
        };
        getUsers();    

        // stahuje temata / tagy

        const getTemata = async () => {
            try {
              const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/communities/tags`
              );
              setTemataList(res.data[0].seznamTagu);
              // console.log(res.data[0].seznamTagu);
              setTagListId(res.data[0]._id);
              // console.log(res.data[0]._id);
              } catch (err) {}
            };
        getTemata();

        // stahuje kategorie

        const getCats = async () => {
            try {
              const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/communities/categories`
              );
              setCatsList(res.data[0].seznamKategorii);
              // console.log(res.data[0].seznamKategorii);
              setCatsListId(res.data[0]._id);
              // console.log(res.data[0]._id);
              } catch (err) {}
            };
        getCats();

    }, [])

    // maze uzivatele

    const userDelete = (e) => {
      try {
        let commId = e.target.value;
        const newUsers = userList.filter((community) => {
            return community._id !== commId;
        });
        setUsers(newUsers);
        axios.delete(`${process.env.REACT_APP_API_URL}/user/${commId}`);
        toast.success("Uživatel smazán!");
        } catch (err) {}
    };

    // maze komunity

    const commDelete = (e) => {
        try {
        let commId = e.target.value;
        const newCommunities = communities.filter((community) => {
            return community._id !== commId;
        });
        setCommunities(newCommunities);
        axios.delete(`${process.env.REACT_APP_API_URL}/communities/${commId}`);
        toast.success("Komunita smazána!");
        } catch (err) {}
    };

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    }

    // uklada kategorie

    const saveCats = (e) => {
      try {
        let uploadCats = e.target.value;
        const novySeznamKategorii = uploadCats.split(",");
        console.log(novySeznamKategorii);
        axios.put(`${process.env.REACT_APP_API_URL}/communities/categories/${catsListId}`, {
          seznamKategorii: novySeznamKategorii,
        });
    
        toast.success("Kategorie uloženy!");
      } catch (err) {}
      console.log(cats);
      console.log(e.target.value);
    };

    // uklada temata

    const saveTopics = (e) => {
      try {
        let uploadTags = e.target.value;
        const novySeznamTagu = uploadTags.split(",");
        console.log(novySeznamTagu);
        console.log(tagListId);
    
        // setTagList(novySeznamTagu);
        axios.put(`${process.env.REACT_APP_API_URL}/communities/tags/${tagListId}`, {
          seznamTagu: novySeznamTagu,
        });
    
        toast.success("Témata uložena!");
      } catch (err) {}
      console.log(e.target.value);
    };

    // change handler tags / temata

    const changeHandler = (name, value) => {
      if(name === 'tags') {
        setTags(value);
        if(value.length > 0 && errors.cats) {
          setErrors(prev => {
            const prevErrors = {...prev};
            delete prevErrors.cats;
            return prevErrors;
          });
        }
      }else if(name === 'emails') {
        setEmails(value);
        if(value.length > 0 && errors.emails) {
          setErrors(prev => {
            const prevErrors = {...prev};
            delete prevErrors.emails;
            return prevErrors;
          });
        }
      }
      console.log();
    }

    // change handler kategorie

    const changeHandler2 = (name, value) => {
      if(name === 'tags') {
        setCats(value);
        if(value.length > 0 && errors.cats) {
          setErrors(prev => {
            const prevErrors = {...prev};
            delete prevErrors.cats;
            return prevErrors;
          });
        }
      }else if(name === 'emails') {
        setEmails(value);
        if(value.length > 0 && errors.emails) {
          setErrors(prev => {
            const prevErrors = {...prev};
            delete prevErrors.emails;
            return prevErrors;
          });
        }
      }
    }

    return (
        <>
        <Header />
        {user.user.isAdmin &&
        <>
      <div className='tabs-menu'>
              <ul className='flex-row'>
                  <li className={toggleState === 1 ? "admin-list list-active" : "admin-list"} onClick={() => toggleTab(1)}>Komunity</li>
                  <li className={toggleState === 2 ? "admin-list list-active" : "admin-list"} onClick={() => toggleTab(2)}>Uživatelé</li>
                  <li className={toggleState === 3 ? "admin-list list-active" : "admin-list"} onClick={() => toggleTab(3)}>Kategorie</li>
                  <li className={toggleState === 4 ? "admin-list list-active" : "admin-list"} onClick={() => toggleTab(4)}>Témata</li>
              </ul>
          </div>

          <div className={toggleState === 4 ? "tabs-active" : "tabs"}>
            <div className='filler temata'>
            <div>   
          <div className='tag-container'>
          
          {temata.length >= 1 &&
            <form>
        <TagsInput 
          label="Seznam témat"
          id="tags"
          name="tags"
          placeholder="Přidej téma"
          onChange={changeHandler}
          error={errors.tags}
          defaultTags={temata}
        />
        
        <Button
            style={{ height: "28px", maxWidth: "250px", marginTop: "25px" }}
            variant="contained"
            color="success"
            onClick={saveTopics}
            value={tags}
          >
            Uložit úpravy
          </Button>
      </form> }

          </div>
    </div>
            </div>
          </div>

          <div className={toggleState === 3 ? "tabs-active" : "tabs"}>
            <div className='filler kategorie'>
            <div>
          <div className='tag-container'>
          {kategorie.length >= 1 &&
      <form>
        <TagsInput 
          label="Seznam kategorií"
          id="tags"
          name="tags"
          placeholder="Přidej kategorii"
          onChange={changeHandler2}
          error={errors.cats}
          defaultTags={kategorie}
        />
        
        <Button
            style={{ height: "28px", maxWidth: "250px", marginTop: "25px" }}
            variant="contained"
            color="success"
            onClick={saveCats}
            value={cats}
          >
            Uložit úpravy
          </Button>
      </form> }
          </div>
    </div>
            </div>
          </div>

          <div className={toggleState === 2 ? "tabs-active" : "tabs"}>
            <div className='button-cont'>
          <Button style={{height: "28px", width: "260px"}} variant="contained" color="success" onClick={refreshUsers}>Zobrazit změny</Button>
            </div>
          <div className="admin-container">
          {userList.map(item=> (
              
              <div
              className="u-container"
              key={item._id}
              >
                  <div id="clickable" onClick={() => setSelectedUser(item)}>              
              <div className="u-info">
                  <div className="u-text">
                  <p>{item.username}</p>
              <span>{item.email}</span>
              </div>
              <div className="u-bottom">
                  <div className="u-members">{item.firma}</div>
                  </div>
              </div>
              </div>
              <Button style={{height: "28px", width: "100%"}} variant="contained" color="error" onClick={userDelete} value={item._id}>Smazat</Button>
          </div>
                ))}
      </div>
          </div>

          <div className={toggleState === 1 ? "tabs-active" : "tabs"}>
          <div className='button-cont'>
          <Button style={{height: "28px", width: "260px"}} variant="contained" color="success" onClick={refreshComms}>Zobrazit změny</Button>
          </div>
      <div className="admin-container">
      
          {communities.map(item=> (
              
              <div
              className="p-container"
              key={item._id}
              
              >
                  <div id="clickable" onClick={() => setSelectedImg(item)}>
              <img src={item.image} alt="community"/>
              <div className="p-info">
                  <div className="p-text">
                  <p>{item.communityname}</p>
              <span>{item.uniqueValue}</span>
              </div>
              <div className="p-bottom">
                  <div className="p-members"><Group/>{item.membersCount}</div>
                  </div>
              </div>
              </div>
                  <Button style={{height: "28px", width: "100%"}} variant="contained" color="error" onClick={commDelete} value={item._id}>Smazat</Button>
          </div>
                ))}
      </div>

      </div>
      </>
        }
      {selectedKom && <CommodalX selectedKom={selectedKom} setSelectedImg={setSelectedImg} temata={temata} kategorie={kategorie}/>}    
      {selectedUser && <CommodalU selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}    
      <Footer/>
      </>
    )
}

export default AdminSekce