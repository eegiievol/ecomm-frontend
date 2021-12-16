import Login from './Login/Login';
import { Link, Route, Routes } from 'react-router-dom';
import Homepage from "./Homepage";
import ProductsShow from './Product/ProductsShow';
import './App.css';

function Dashboard() {

    const token = localStorage.getItem("authorization");

    return (
        <div className="App">
            
            <ul id='menu'>
                <li><Link to='/homepage'>Homepage</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/products'>Products</Link></li>
            </ul>

            
            <Routes>
                <Route path='/login' element={
                    <Login />
                } />

                <Route path='/homepage' element={
                    <Homepage />
                } />

                <Route path='/products' element={
                    <ProductsShow />
                }/>

            </Routes>
                
        </div>
    )

}

export default Dashboard