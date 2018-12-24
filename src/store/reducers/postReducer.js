import _ from "lodash";
import { CREATE_POST } from "../actions/postActions";
import { CREATE_POST_ERROR } from "../actions/postActions";
import { DELETE_POST } from "../actions/postActions";
import {
  UPDATE_POST,
  STORE_POSTS_SUCCESS,
  STORE_POSTS_ERROR
} from "../actions/postActions";

const initState = {
  posts: [],
  postError: null
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_POST:
      console.log("post created", action.post);
      return state;
    case CREATE_POST_ERROR:
      console.log("error post created", action.error);
      return state;

    case DELETE_POST:
      return state;

    case UPDATE_POST:
      console.log("post updated");
      return state;

    case STORE_POSTS_SUCCESS:
      const snapshot = action.payload;
      const array = [];
      //  console.log(snapshot);
      snapshot.forEach(doc => {
        //  console.log(doc.data());
        array.push(doc.data());
      });
      //  console.log(array);
      return {
        ...state,
        posts: array.slice(0)
      };

    case STORE_POSTS_ERROR:
      return {
        ...state,
        postError: action.error.message
      };

    default:
      return state;
  }
};

export default postReducer;
