import axios from "axios";
import React, { useEffect, useState } from "react";
import ComboBox from "react-responsive-combo-box";
import 'react-responsive-combo-box/dist/index.css'
import '../Product.css'

function Product() {
    //--------------Model
    const [productCategory, setProductCategory] = useState({
        category:
            [
                'Clothing',
                'Computer',
                'Book'
            ]
    });

    const [selectedCategory, setSelectedCategory] = useState({});

    const [productName, setProductName] = useState({});

    const [productPrice, setProductPrice] = useState(0.0);

    const saved_token = localStorage.getItem("jwt");
    const AuthStr = 'Bearer '.concat(saved_token);

    //--------------Functions
    function populateCategory() {
        axios.get('http://localhost:8080/products/getAllCategory', { headers: { 'Authorization': AuthStr } })
            .then(res => {
                setProductCategory({ category: res.data })
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    function addNewProduct() {
        const product = {name: productName, price: productPrice, productCategory: selectedCategory, user: {id: 2}};

        console.log("aaa:" + productName + " " + productPrice + " " + selectedCategory);
        console.log(product);
        axios.post('http://localhost:8080/products', product, {headers: { 'Authorization': AuthStr }})
        .then(res => {
            console.log('Product has been added successfully', res.data);
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }

    //--------------Operation
    useEffect(() => {
        localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzOTYxNjkyMiwiZXhwIjoxNjM5NjM0OTIyfQ.4hc3Hy_hrElDsDYsKNl9TXg6gW_J4ikrohB12N6edNI");
        localStorage.setItem("user", "admin");

        populateCategory();
    }, [])


    //--------------View
    return (
        <div>
            <div className="productForm">
                <label>Create new Product:</label>
                <br />
                <br />
                Name:<input type="text" onChange={event => setProductName(event.target.value)} />
                <br />
                <br />
                Price:<input type="text" onChange={event => setProductPrice(event.target.value)} />
                <br />
                <br />
                <ComboBox options={productCategory.category} name="category" enableAutocomplete onSelect={setSelectedCategory} />
                <input type="submit" value="Add product" onClick={addNewProduct} />
            </div>
        </div>
    )
}

export default Product;