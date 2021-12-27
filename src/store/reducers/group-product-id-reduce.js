const initialState =[];

const groupProductIdReduce = (state = initialState, action) =>{
    if(action.type === "SET_GROUP_PRODUCTS_ID"){
        // console.log("masuk reducer Group product", action);
        return action.payload
    }
    return state
}

export default groupProductIdReduce;