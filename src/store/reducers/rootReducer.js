import { combineReucer } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

const rootReducer = combineReucer({
  auth: authReducer,
  post: postReducer
});

export default rootReducer;
