import CardProduct from "../component/card/card"
import banner from "./banner.png"
import "./home.css"


const Home = () => {
  
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
         <div className="banner"/>
        {/* <img src={banner} alt="banner" /> */}
        </div>
        <div className="CardContainer"><CardProduct /></div>
        </div>
        </>

    )
}

export default Home