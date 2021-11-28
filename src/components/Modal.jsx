// this is the window that opens when the katalog item is clicked

import React from "react";

const Commodal = ({ selectedKom, setSelectedImg }) => {
  const handleHideClick = (e) => {
    setSelectedImg(null);
  };

  return (
    <>
      <div className="basemodal">
        <div className="modalwrapper">
          <div className="main-content">
            <div className="comm-grid">
            <img src={selectedKom.image} alt="think bigger!" />
            <div className="comm-desc">
            <h4><b>{selectedKom.communityname}</b></h4>
              <p>{selectedKom.uniqueValue}</p>
            </div>
            </div>

          </div>
          <div className="closer" onClick={handleHideClick}></div>
        </div>
      </div>
    </>
  );
};

export default Commodal;
