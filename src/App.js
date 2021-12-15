import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './view/component/footer/footer';
import GroupProduct from './view/component/grupCard/groupProduct';
import NavBarApp from './view/component/navbar/NavBarApp';
import Home from './view/pages';

function App() {
  return (
  <BrowserRouter>
      <NavBarApp/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/group/:ProductsID" element={<GroupProduct/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>  
  )
}

export default App;
