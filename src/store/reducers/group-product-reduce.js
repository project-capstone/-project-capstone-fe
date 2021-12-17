const initialState =[];

const groupProductReduce = (state = initialState, action) =>{
    if(action.type === "SET_GROUP_PRODUCTS"){
        // console.log("masuk reducer Group product", action);
        return action.payload
    }
    return state
}

export default groupProductReduce;