import { useEffect, useState, useContext } from "react";
import axios from "axios";
// modal for communities
import CommodalX from "../components/ModalX";
// modal for users
import CommodalU from "../components/ModalU";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import Group from "@mui/icons-material/Group";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import TagsInput from "../components/TagsInput";
import CommsContext from "../api/communities";

const AdminSekce = () => {
  const [userList, setUsers] = useState([]);
  const [temata, setTemataList] = useState([]);
  const [kategorie, setCatsList] = useState([]);

  const [selectedKom, setSelectedImg] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useContext(UserContext);

  const [catsListId, setCatsListId] = useState("");
  const [cats, setCats] = useState([]);

  const [tagListId, setTagListId] = useState("");
  const [tags, setTags] = useState([]);

  const [errors, setErrors] = useState({});
  const [emails, setEmails] = useState([]);

  // obnovuje uzivatele

  const refreshUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/users`
      );
      setUsers(res.data);
    } catch (err) {}
  };

    // context pro stahovani a mazani komunit

    const {communities, getMarketComms, commDelete} = useContext(CommsContext)

  useEffect(() => {

    // stahuje komunity
    getMarketComms();

    // stahuje uzivatele

    const getUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/users`
        );
        setUsers(res.data);
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
        setTagListId(res.data[0]._id);
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
        setCatsListId(res.data[0]._id);
      } catch (err) {}
    };
    getCats();
  }, []);

  // maze uzivatele

  const userDelete = (e) => {
    if (window.confirm("Smazat uzivatele?")) {
      try {
        let commId = e.target.value;
        const newUsers = userList.filter((community) => {
          return community._id !== commId;
        });
        setUsers(newUsers);
        axios.delete(`${process.env.REACT_APP_API_URL}/user/${commId}`);
        toast.success("Uživatel smazán!");
      } catch (err) {}
    }
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // uklada kategorie

  const saveCats = (e) => {
    try {
      let uploadCats = e.target.value;
      const novySeznamKategorii = uploadCats.split(",");
      axios.put(
        `${process.env.REACT_APP_API_URL}/communities/categories/${catsListId}`,
        {
          seznamKategorii: novySeznamKategorii,
        }
      );

      toast.success("Kategorie uloženy!");
    } catch (err) {}
  };

  // uklada temata

  const saveTopics = (e) => {
    try {
      let uploadTags = e.target.value;
      const novySeznamTagu = uploadTags.split(",");

      axios.put(
        `${process.env.REACT_APP_API_URL}/communities/tags/${tagListId}`,
        {
          seznamTagu: novySeznamTagu,
        }
      );

      toast.success("Témata uložena!");
    } catch (err) {}
  };

  // change handler tags / temata

  const changeHandler = (name, value) => {
    if (name === "tags") {
      setTags(value);
      if (value.length > 0 && errors.cats) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.cats;
          return prevErrors;
        });
      }
    } else if (name === "emails") {
      setEmails(value);
      if (value.length > 0 && errors.emails) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.emails;
          return prevErrors;
        });
      }
    }
  };

  // change handler kategorie

  const changeHandler2 = (name, value) => {
    if (name === "tags") {
      setCats(value);
      if (value.length > 0 && errors.cats) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.cats;
          return prevErrors;
        });
      }
    } else if (name === "emails") {
      setEmails(value);
      if (value.length > 0 && errors.emails) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.emails;
          return prevErrors;
        });
      }
    }
  };

  // filtering uzivatelu

  const [filterUser, setFilterUser] = useState("");

  const searchTextU = (event) => {
    setFilterUser(event.target.value);
  };

  let filteredUser = userList.filter((item) => {
    return Object.keys(item).some((key) =>
      item.username
        .toString()
        .toLowerCase()
        .includes(filterUser.toString().toLocaleLowerCase())
        );
  });

  // filtering komunit

  const [filterComm, setFilterComm] = useState("");

  const searchTextC = (event) => {
    setFilterComm(event.target.value);
  };

  let filteredComm = communities.filter((item) => {
    return Object.keys(item).some((key) =>
      item.communityname
        .toString()
        .toLowerCase()
        .includes(filterComm.toString().toLocaleLowerCase())
    );
  });

  return (
    <>
      <Header />
      {user.user.isAdmin && (
        <>
          <div className="tabs-menu">
            <ul className="flex-row">
              <li
                className={
                  toggleState === 1 ? "admin-list list-active" : "admin-list"
                }
                onClick={() => toggleTab(1)}
              >
                Komunity
              </li>
              <li
                className={
                  toggleState === 2 ? "admin-list list-active" : "admin-list"
                }
                onClick={() => toggleTab(2)}
              >
                Uživatelé
              </li>
              <li
                className={
                  toggleState === 3 ? "admin-list list-active" : "admin-list"
                }
                onClick={() => toggleTab(3)}
              >
                Kategorie
              </li>
              <li
                className={
                  toggleState === 4 ? "admin-list list-active" : "admin-list"
                }
                onClick={() => toggleTab(4)}
              >
                Témata
              </li>
            </ul>
          </div>

          <div className={toggleState === 4 ? "tabs-active" : "tabs"}>
            <div className="filler temata">
              <div>
                <div className="tag-container">
                  {temata.length >= 1 && (
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
                        style={{
                          height: "28px",
                          maxWidth: "250px",
                          marginTop: "25px",
                        }}
                        variant="contained"
                        color="success"
                        onClick={saveTopics}
                        value={tags}
                      >
                        Uložit úpravy
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={toggleState === 3 ? "tabs-active" : "tabs"}>
            <div className="filler kategorie">
              <div>
                <div className="tag-container">
                  {kategorie.length >= 1 && (
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
                        style={{
                          height: "28px",
                          maxWidth: "250px",
                          marginTop: "25px",
                        }}
                        variant="contained"
                        color="success"
                        onClick={saveCats}
                        value={cats}
                      >
                        Uložit úpravy
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={toggleState === 2 ? "tabs-active" : "tabs"}>
            <div className="s-container">
              <div className="search-bar-custom">
                <span>
                  <h4>Hledat:</h4>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={filterUser}
                  onChange={searchTextU.bind(this)}
                  placeholder="Zadejte hledaný výraz"
                />
              </div>
            </div>

            <div className="admin-container">
              {filteredUser.map((item) => (
                <div className="u-container" key={item._id}>
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
                  <Button
                    style={{ height: "28px", width: "100%" }}
                    variant="contained"
                    color="error"
                    onClick={userDelete}
                    value={item._id}
                  >
                    Smazat
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className={toggleState === 1 ? "tabs-active" : "tabs"}>
            <div className="s-container">
              <div className="search-bar-custom">
                <span>
                  <h4>Hledat:</h4>
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={filterComm}
                  onChange={searchTextC.bind(this)}
                  placeholder="Zadejte hledaný výraz"
                />
              </div>
            </div>

            <div className="admin-container">
              {filteredComm.map((item) => (
                <div className="p-container" key={item._id}>
                  <div id="clickable" onClick={() => setSelectedImg(item)}>
                    <img src={item.image} alt="community" />
                    <div className="p-info">
                      <div className="p-text">
                        <p>{item.communityname}</p>
                        <span>{item.uniqueValue}</span>
                      </div>
                      <div className="p-bottom">
                        <div className="p-members">
                          <Group />
                          {item.membersCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    style={{ height: "28px", width: "100%" }}
                    variant="contained"
                    color="error"
                    onClick={commDelete}
                    value={item._id}
                  >
                    Smazat
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedKom && (
        <CommodalX
          selectedKom={selectedKom}
          setSelectedImg={setSelectedImg}
          temata={temata}
          kategorie={kategorie}
          getMarketComms={getMarketComms}
        />
      )}
      {selectedUser && (
        <CommodalU
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          refreshUsers={refreshUsers}
        />
      )}
      <Footer />
    </>
  );
};

export default AdminSekce;
