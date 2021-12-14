import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './view/component/footer/footer';
import GroupProdut from './view/component/grupCard/groupProduct';
import NavBarApp from './view/component/navbar/NavBarApp';
import Home from './view/pages';

function App() {
  return (
    <BrowserRouter>
    <NavBarApp/>
    <Routes>
      <Route path ="/" element ={<Home/>} />
      <Route path ="/groupProduct" element ={<GroupProdut/>} />
          
    </Routes>
    <Footer/>
    </BrowserRouter>
     );
}

export default App;
