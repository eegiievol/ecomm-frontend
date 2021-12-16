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

    const [inputState, setInputState] = useState({
        prname: '',
        prprice: 0.0
    });

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
        const product = {name: inputState.prname, price: inputState.prprice, productCategory: selectedCategory, user: {id: 1}};

        console.log(inputState.prname);
        axios.post('http://localhost:8080/products', {headers: { 'Authorization': AuthStr }}, product)
        .then(res => {
            console.log('Product has been added successfully', res.data);
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }

    function onChangeProduct(e) {        
        setInputState( {...inputState, [e.target.key]: [e.target.value]} )
        console.log(inputState.prname + " " + inputState.prname.value);
    }

    //--------------Operation
    useEffect(() => {
        localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzOTYwOTc0NiwiZXhwIjoxNjM5NjI3NzQ2fQ.0Hi1HNx8ur9tgnwHNUKpW8EOINMu7ZCm6ad9_smb8-g");
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
                Name:<input type="text" value={inputState.prname.value} key="prname" onChange={onChangeProduct} />
                <br />
                <br />
                Price:<input type="text" key="prprice" onChange={onChangeProduct} />
                <br />
                <br />
                <ComboBox options={productCategory.category} name="category" enableAutocomplete onSelect={setSelectedCategory} />
                <input type="submit" value="Add product" onClick={addNewProduct} />
            </div>
        </div>
    )
}

export default Product;