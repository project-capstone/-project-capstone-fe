const initialState =[];

const groupUserProductReduce = (state = initialState, action) =>{
    if(action.type === "SET_USER_GROUP_PRODUCTS"){
        console.log("masuk reducer User Group product", action);
        return action.payload
    }
    return state
}

export default groupUserProductReduce;