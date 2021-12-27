import CardProduct from "../component/card/card"
import Banner from "../component/bannerHome/banner"
import ScrollButton from "../component/scrollButton/scroll"
import "./home.css"


const Home = () => {
  
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
         <div className="banner"><Banner /></div>
        </div>
        <div className="CardContainer"><CardProduct /></div>
        <ScrollButton />
        </div>
        </>

    )
}

export default Home