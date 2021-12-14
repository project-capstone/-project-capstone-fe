const initialState =[];

const productReduce = (state = initialState, action) =>{
    if(action.type === "SET_PRODUCTS"){
        console.log("masuk reducer product", action);
        return action.payload
    }
    return state
}

export default productReduce;