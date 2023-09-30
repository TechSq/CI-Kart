import './App.css';
import { Route, Routes,useLocation } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import ForgotPassword from './Views/ForgotPassword';
import './css/Style.css';
import OtpVerification from './Views/OtpVerification';
import SetNewPassword from './Views/SetNewPassword';
import Home from './Views/Home';
import SubCategory from './Views/SubCategory';
import CategoryListing from './Views/CategoryListing';
import InfoDetails from './Views/InfoDetails';
import Product from './Views/Product';
import Cartpage from './Views/Cartpage';
import Header from './Components/Header';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
    {
      ["/register","/login","/forgotpw","/otpverification","/setnewpassword"].includes(location.pathname)  ? null : <Header/>
    }
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='forgotpw' element={<ForgotPassword />} />
      <Route path='/otpverification' element={<OtpVerification />} />
      <Route path='/setnewpassword' element={<SetNewPassword />} />
      <Route path='/login' element={<Login />} />
      <Route path='/subcategory' element={<SubCategory />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/productDetails/:subcatId/:productId' element={<InfoDetails />} />
      <Route path='/categorylisting' element={<CategoryListing />} />
      <Route path='/details' element={<InfoDetails />} />
      <Route path='/cart' element={<Cartpage />} />
    </Routes>
    </>
  );
}

export default App;
