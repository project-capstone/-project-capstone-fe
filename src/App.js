import './App.css';
import Footer from './view/component/footer/footer';
import GroupProdut from './view/component/grupCard/groupProduct';
import NavBarApp from './view/component/navbar/NavBarApp';
import Home from './view/pages';

function App() {
  return (
    <>
    <NavBarApp/>
    {/* <Home/> */}
    <GroupProdut/>
    <Footer/>
    </>
    // <NavBarApp/>
  );
}

export default App;
