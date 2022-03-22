import { useEffect, useState } from "react";
import axios from "axios";
import Commodal from "../components/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import Group from "@mui/icons-material/Group";

const Marketplace = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedKom, setSelectedImg] = useState(null);

  // filtering

  const [filter, setFilter] = useState("");

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  let filtered = communities.filter((item) => {
    return Object.keys(item).some((key) =>
      item.communityname
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLocaleLowerCase())
    );
  });

  // stahovani dat

  useEffect(() => {
    const getMarketComms = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/communities`
        );
        setCommunities(res.data);
        console.log(res);
      } catch (err) {}
    };
    getMarketComms();
  }, []);

  return (
    <>
      <Header />

      <div className="s-container">
        <div className="search-bar-custom">
          <span>
            <h4>Hledat:</h4>
          </span>
          <input
            type="text"
            className="form-control"
            value={filter}
            onChange={searchText.bind(this)}
            placeholder="Zadejte hledaný výraz"
          />
        </div>
      </div>

      <div className="k-container">
        {filtered
          .filter((item) => {
            return item.marketApproved === true;
          })
          .map((item) => (
            <div
              className="p-container"
              key={item._id}
              onClick={() => setSelectedImg(item)}
            >
              <div className="image-container">
                <div
                  className={
                    item.regIntentionn === 2 ? "sponzor-tag" : "prodej-tag"
                  }
                ></div>
                <img src={item.image} alt="community" />
              </div>
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
                  <Button
                    style={{ height: "28px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Prozkoumat
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {selectedKom && (
        <Commodal selectedKom={selectedKom} setSelectedImg={setSelectedImg} />
      )}
      <Footer />
    </>
  );
};

export default Marketplace;
