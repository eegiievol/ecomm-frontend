// import logo from './logo.svg';
import './App.css';
import Product from './Components/Product';


import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  //--------------Model

  //--------------View
  return (
<<<<<<< HEAD
    <div>
        <Product />
    </div>
=======
    <BrowserRouter>

      <div className='App'>
        <Dashboard/>
      </div>
    </BrowserRouter>
>>>>>>> 51b89b9364cc2e085e163f981408dd893851fe2a
  );
}

export default App;