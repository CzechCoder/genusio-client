import React, { useState } from "react";
import "../TagyNew.scss";

import TagsInput from "../components/TagsInput";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TagyInput = () => {
  const [tags, setTags] = useState([]);
  const [emails, setEmails] = useState([]);
  const [errors, setErrors] = useState({});

  const changeHandler = (name, value) => {
    if (name === "tags") {
      setTags(value);
      if (value.length > 0 && errors.tags) {
        setErrors((prev) => {
          const prevErrors = { ...prev };
          delete prevErrors.tags;
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

  // Get tags

  const getTags = async () => {
    setHide(!hide);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/communities/tags`
      );
      setTagList(res.data[0].seznamTagu);
      console.log(res.data[0].seznamTagu);
      setTagListId(res.data[0]._id);
      console.log(res.data[0]._id);
    } catch (err) {}
  };

  const [hide, setHide] = React.useState(false);

  const [tagList, setTagList] = useState([]);
  const [tagListId, setTagListId] = useState("");

  // custom code

  const saveTags = (e) => {
    try {
      let uploadTags = e.target.value;
      const novySeznamTagu = uploadTags.split(",");
      console.log(novySeznamTagu);
      console.log(tagListId);

      axios.put(
        `${process.env.REACT_APP_API_URL}/communities/tags/${tagListId}`,
        {
          seznamTagu: novySeznamTagu,
        }
      );

      toast.success("Tagy uloženy!");
    } catch (err) {}
  };

  return (
    <div>
      <Header />
      <div className="tag-container">
        {tagList.length >= 1 && (
          <form>
            <TagsInput
              label="Seznam témat"
              id="tags"
              name="tags"
              placeholder="Přidej téma"
              onChange={changeHandler}
              error={errors.tags}
              defaultTags={tagList}
            />

            <Button
              style={{ height: "28px", maxWidth: "250px", marginTop: "25px" }}
              variant="contained"
              color="success"
              onClick={saveTags}
              value={tags}
            >
              Uložit úpravy
            </Button>
          </form>
        )}
        <Button
          style={{ height: "28px", maxWidth: "250px", margin: "0 auto" }}
          id={hide ? "tag-dl" : null}
          variant="contained"
          color="warning"
          onClick={getTags}
        >
          Stáhnout témata
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default TagyInput;
