const initialState ={}

const orderReducer = (state = initialState, action) =>{
    if(action.type === "SET_ORDER") {
        // console.log("reducer order" , action)
        return action.payload
    }
    return state
}

export default orderReducer