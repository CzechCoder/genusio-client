import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


const CommsContext = createContext()

  export const CommsProvider = ({children}) => {
    const [communities, setCommunities] = useState([]);

    const getMarketComms = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/communities`
          );
          setCommunities(res.data);
        } catch (err) {}
      };

        // maze komunity

  const commDelete = (e) => {
    if (window.confirm("Smazat komunitu?")) {
      try {
        let commId = e.target.value;
        const newCommunities = communities.filter((community) => {
          return community._id !== commId;
        });
        setCommunities(newCommunities);
        axios.delete(`${process.env.REACT_APP_API_URL}/communities/${commId}`);
        toast.success("Komunita smazána!");
      } catch (err) {}
    }
  };

      return <CommsContext.Provider value={{
        communities,
        getMarketComms,
        commDelete
      }}>
          {children}
      </CommsContext.Provider>

  }

  export default CommsContext