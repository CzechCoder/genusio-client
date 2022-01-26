import React, { useState } from 'react';
import '../TagyNew.scss';

import TagsInput from '../components/TagsInput';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";

const KategorieInput = () => {
  const [cats, setCats] = useState([]);
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({});

  const changeHandler = (name, value) => {
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

// Get categories

// useEffect(() => {    

  const getCats = async () => {
    setHide(!hide);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/communities/categories`
      );
      setCatsList(res.data[0].seznamKategorii);
      console.log(res.data[0].seznamKategorii);
      setCatsListId(res.data[0]._id);
      console.log(res.data[0]._id);
      } catch (err) {}
    };
  // getCats();

// }, []);

const [hide, setHide] = React.useState(false);

const [catsList, setCatsList] = useState([]);
const [catsListId, setCatsListId] = useState("");

// custom code

const saveCats = (e) => {
  try {
    let uploadCats = e.target.value;
    const novySeznamKategorii = uploadCats.split(",");
    console.log(novySeznamKategorii);
    console.log(catsListId);

    // setTagList(novySeznamTagu);
    axios.put(`${process.env.REACT_APP_API_URL}/communities/categories/${catsListId}`, {
      seznamKategorii: novySeznamKategorii,
    });

    toast.success("Kategorie uloženy!");
  } catch (err) {}
};

  return (
    <div>
      <Header />
          <div className='tag-container'>
          {catsList.length >= 1 &&
      <form>
        <TagsInput 
          label="Seznam kategorií"
          id="tags"
          name="tags"
          placeholder="Přidej kategorii"
          onChange={changeHandler}
          error={errors.cats}
          defaultTags={catsList}
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
      <Button
            style={{ height: "28px", maxWidth: "250px", margin: "0 auto" }}
            id={hide ? "tag-dl" : null}
            variant="contained"
            color="warning"
            onClick={getCats}
          >
            Stáhnout kategorie
          </Button>
          </div>
      <Footer />
    </div>
  );
}

export default KategorieInput;