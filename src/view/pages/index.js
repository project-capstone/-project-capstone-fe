import CardProduct from "../component/card/card"
import {useDispatch,useSelector} from 'react-redux'
import React, {useEffect} from "react"
import allStore from "../../store/actions";

import "./home.css"


const Home = () => {
    const dispatch = useDispatch();
    const listProduct = useSelector(({listProduct}) => listProduct)

    

    useEffect(() =>{
        dispatch(allStore.fetchProduct())
    },[dispatch])

   
    return(
        <>
        <div className="HomeContainer">
        <div className="Containerbanner">
         <div className="banner"/>
        </div>
        <div className="CardContainer"><CardProduct listProduct={listProduct}/></div>
        </div>
        </>

    )
}

export default Home