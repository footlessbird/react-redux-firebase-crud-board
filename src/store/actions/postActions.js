export const CREATE_POST = "CREATE_POST";

export const createPost = post => {
    //  due to redux-thunk can return function
    return (dispatch, getSate,{getFirebase, getFirestore}) => {
    dispatch({ type: CREATE_POST, post });
  };
};
