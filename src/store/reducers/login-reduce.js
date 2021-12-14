const initialState = {};

const loginReduce = (state = initialState, action) => {
  if (action.type === "SET_LOGIN") {
    console.log("4. Masuk Reducer:", action);
    return action.payload;
  }

  return state;
};

export default loginReduce;