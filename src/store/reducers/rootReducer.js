import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  
  auth: authReducer,
  posts: postsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer  
});

export default rootReducer;
