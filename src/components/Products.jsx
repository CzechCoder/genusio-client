/* import React, { useEffect, useState } from 'react'
import Product from "./Product";
import axios from "axios";

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8080/products");
                setProducts(res.data);
                console.log(res)
            } catch (err) {}
        };
        getProducts();
    }, [])

    return (
        <>
        <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
        <div className="text-center mb-5 alert alert-primary">
            <label htmlFor="" className="h2">
                Katalog
                </label>
        </div>    
      </div>
      <div className="k-container">
          {products.map(item=> (
                    <Product item={item} key={item.id}/>
                ))}
      </div>
      </>
    )
}

export default Products
*/