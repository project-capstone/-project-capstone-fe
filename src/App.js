import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './view/component/footer/footer';
import NavBarApp from './view/component/navbar/NavBarApp';
import Home from './view/pages';
import AddProduct from './view/pages/addProduct/addProduct.jsx';
import DetailProduct from './view/pages/detailProduct/detailProduct';
import DetailGroupProduct from './view/pages/detailGroupProduct/detailGroup';
import EditProduct from './view/pages/editProduct/editProduct';
import GroupProduct from './view/component/grupCard/groupProduct';
import AllUser from './view/pages/allUser/allUser';

function App() {
  return (
  <BrowserRouter>
      <NavBarApp/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/group/:ProductsID" element={<GroupProduct/>} />
      <Route path="/addproduct" element={<AddProduct/>} />
      <Route path="/products/:id" element={<DetailProduct/>} />
      <Route path="/groupproducts/:id" element={<DetailGroupProduct/>} />
      <Route path="/editproducts/:id" element={<EditProduct/>} />
      <Route path="/alluser" element={<AllUser/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>  
  )
}

export default App;
