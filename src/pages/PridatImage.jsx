import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import commreg from "../img/commreg.png";

// functions
import { registerComm } from "../api/community";
import { Box, unstable_getThemeValue } from "@mui/system";

const PridatImage = () => {
  const navigate = useNavigate();

  // form for community
  const [communityname, setCommName] = useState("");
  const [img, setCommimg] = useState("");
  
  const [image, setImage] = useState(null);

  const fileSelected = (e) => {
    console.log(e.target.files[0])
    }

  // rendering the window

//
  return (
    <>
      <h1>To Upload Image on mongoDB</h1>
    <hr/>
    <div>
        <form action="/" method="POST" enctype="multipart/form-data">
            <div>
                <label for="name">Image Title</label>
                <input type="text" id="name" placeholder="Name" 
                       value="" name="name" />
            </div>
            <div>
            </div>
            <div>
                <label for="image">Upload Image</label>
                <input type="file" id="image" 
                       name="image" value="" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  
    <hr/>
    </>
  );
};

export default PridatImage;