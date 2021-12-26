const initialState =[];

const orderUserreducer = (state = initialState, action) =>{
    if(action.type === "SET_ORDER_USER"){
        // console.log("masuk reducer Group product", action);
        return action.payload
    }
    return state
}

export default orderUserreducer;