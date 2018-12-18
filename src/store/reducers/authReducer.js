import { LOGIN_SUCCESS } from "../actions/authActions";
import { LOGIN_ERROR } from "../actions/authActions";
import { SIGNOUT } from "../actions/authActions";
import { SIGNUP_SUCCESS } from "../actions/authActions";
import { SIGNUP_ERROR } from "../actions/authActions";
const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log("login error :(");
      return {
        ...state,
        authError: "Login error :("
      };
    case LOGIN_SUCCESS:
      console.log("login success :D");
      return {
        ...state,
        authError: null
      };
    case SIGNOUT:
      console.log("sign out bye~");
      return state;
    case SIGNUP_SUCCESS:
      console.log("sign up success welcome^^");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_ERROR:
      console.log("sign up error >.<");
      return {
        ...state,
        authError: action.error.message
      };

    default:
      return state;
  }
};

export default authReducer;
