import React, { useEffect, useState } from 'react'
import axios from "axios";
import Commodal from '../components/Modal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import Group from '@mui/icons-material/Group';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [selectedKom, setSelectedImg] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(res.data);
                console.log(res)
            } catch (err) {}
        };
        getProducts();
    }, [])

    return (
        <>
        <Header />
      <div className="k-container">
          {products.map(item=> (
              <div
              className="p-container"
              key={item._id}
              onClick={() => setSelectedImg(item)}
              >
              <img src={item.image} alt="product"/>
              <div className="p-info">
                  <div className="p-text">
                  <p>{item.communityname}</p>
              <span>{item.uniqueValue}</span>
              </div>
              <div className="p-bottom">
                  <div className="p-members"><Group/>{item.membersCount}</div>
                  <Button style={{height: "28px"}} variant="contained" color="secondary">Prozkoumat</Button>
                  </div>
              </div>
          </div>
                ))}
      </div>
      {selectedKom && <Commodal selectedKom={selectedKom} setSelectedImg={setSelectedImg}/>}    
      <Footer/>
      </>
    )
}

export default Products