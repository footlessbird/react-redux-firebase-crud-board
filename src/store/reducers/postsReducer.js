//  import _ from "lodash";
//  import moment from "moment";

import { CREATE_POST } from "../actions/postActions";
import { CREATE_POST_ERROR } from "../actions/postActions";
import { DELETE_POST } from "../actions/postActions";
import {
  UPDATE_POST,
  STORE_POSTS_SUCCESS,
  STORE_POSTS_ERROR,
  //  ADD_COMMENT_SUCCESS,
  STORE_COMMENTS_SUCCESS
} from "../actions/postActions";

const initState = {
  posts: [],
  postError: null,
  comments: []
};

const postsReducer = (state = initState, action) => {
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
        posts: array
      };

    case STORE_POSTS_ERROR:
      return {
        ...state,
        postError: action.error.message
      };
    /*
    case ADD_COMMENT_SUCCESS:
      const commentSnapshot = action.payload;
      const commentArray = [];
      commentSnapshot.forEach(doc => {
        console.log(doc.data());

        commentArray.push({
          id: doc.id,
          postId: doc.data().postId,
          uid: doc.data().userId,
          comment: doc.data().comment,
          createdAt: doc.data().createdAt
        });
      });

      commentArray.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      
      console.log(commentArray);
      return {
        ...state,
        comments: commentArray
      };
*/

    case STORE_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload
      };

    default:
      return state;
  }
};

export default postsReducer;
