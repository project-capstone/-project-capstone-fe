import CardProduct from "../component/card/card"
// import Footer from "../component/footer/footer"
// import NavBarApp from "../component/navbar/NavBarApp"
import "./home.css"

const Home = () => {
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
         <div className="banner"/>
        </div>
        <div className="CardContainer"><CardProduct/></div>
        </div>
        </>

    )
}

export default Home