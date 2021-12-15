import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './view/component/footer/footer';
import NavBarApp from './view/component/navbar/NavBarApp';
import Home from './view/pages';

function App() {
  return (
  <BrowserRouter>
      <NavBarApp/>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
    <Footer/>
  </BrowserRouter>  
  )
}

export default App;
