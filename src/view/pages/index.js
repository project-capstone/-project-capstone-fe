import CardProduct from "../component/card/card"
import allStore from "../../store/actions";

import "./home.css"


const Home = () => {
  
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
         <div className="banner"/>
        </div>
        <div className="CardContainer"><CardProduct /></div>
        </div>
        </>

    )
}

export default Home