import CardProduct from "../component/card/card"
import Footer from "../component/footer/footer"
import "./home.css"

const Home = () => {
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
            <div className="banner"> 
           
            </div>
        </div>
        <div className="CardContainer"><CardProduct/></div>
        </div>
        <Footer/>
        </>

    )
}

export default Home