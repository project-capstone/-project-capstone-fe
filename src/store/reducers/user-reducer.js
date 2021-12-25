const initialState =[];

const userReducer = (state = initialState, action) =>{
    if(action.type === "SET_USER"){
        // console.log("masuk reducer Group product", action);
        return action.payload
    }
    return state
}

export default userReducer;