import _ from "lodash";
import moment from "moment";

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
      console.log(action.post);
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
      snapshot.forEach(doc => {
        //  console.log(doc);
        //  console.log(doc.id);
        array.push({
          id: doc.id,
          authorId: doc.data().authorId,
          authorFirstName: doc.data().authorFirstName,
          authorLastName: doc.data().authorLastName,
          title: doc.data().title,
          content: doc.data().content,
          /*
          createdAt: moment(doc.data().createdAt.toDate()).format(
            "MMMM Do YYYY, h:mm:ss a"
          )
          */
          createdAt: doc.data().createdAt
        });
      });

      array.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      console.log(array);
      return {
        ...state,
        //  posts: array.slice(0)
        posts: array
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
