import React, { Component, useState } from "react";
import axios from "axios";

function Login() {

    let [state, setState] = useState({
        "username": "admin",
        "password": "1234"
    })

    

    function handleFormSubmit(event) {
        event.preventDefault();

        const endpoint = "http://localhost:8080/authenticate";

        const user_object = {
            username: state.username,
            password: state.password
        };

        axios.post(endpoint, user_object)
            .then(res => {
                console.log(res.data.jwt);
                localStorage.setItem("authorization", res.data.jwt);
                handleDashboard();
            });
    };

    function handleDashboard() {
        const saved_token = localStorage.getItem("authorization");
        const AuthStr = 'Bearer '.concat(saved_token); 

        console.log("got token: ", AuthStr)

        axios.get("http://localhost:8080/products/getAll", {
            headers: {
                'Authorization': AuthStr
            }
        })
            .then(res => {
                console.log(res.data)
                // if (res.data === "success") {
                //     console.log(res.data)
                // } else {
                //     alert("Authentication failure");
                // }
            });
    }


    return (
        <div className="App">
            <div class="wrapper">
                <form class="form-signin" onSubmit={handleFormSubmit}>
                    <h2 class="form-signin-heading">Please login</h2>
                    <div className="form-group">
                        <input type="text"
                            class="form-control"
                            placeholder="User name"
                            value="admin"
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            class="form-control"
                            placeholder="password"
                            value="admin"
                        />
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Login;