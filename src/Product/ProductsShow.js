import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import './product.css';

function ProductsShow() {

    const saved_token = localStorage.getItem("authorization");
    const AuthStr = 'Bearer '.concat(saved_token);

    let [productsState, setProductsState] = useState({
        products: [
            {
                id: "xx",
                productCategory: "xx",
                name: "xx",
                addedDate: "xx",
                price: "xx",
                productStatus: "xx"
            }
        ]
    })

    useEffect(() => {

        const saved_token = localStorage.getItem("authorization");
        const AuthStr = 'Bearer '.concat(saved_token);
        console.log("got token: ", AuthStr)
        console.log("USE EFFECT CALLED")
        axios.get("http://localhost:8080/products/getAll", {
            headers: {
                'Authorization': AuthStr
            }
        })
            .then(res => {
                console.log(res.data)
                setProductsState({ products: res.data })
            })
    }, []);

    return (
        productsState.products.map((item) => {
            return <ProductList
                id={item.id}
                productCategory={item.productCategory}
                name={item.name}
                addedDate={item.addedDate}
                price={item.price}
                productStatus={item.productStatus}
            />
        })

    )
}

export default ProductsShow