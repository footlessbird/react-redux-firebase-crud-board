export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const STORE_POSTS_SUCCESS = "STORE_POSTS_SUCCESS";
export const STORE_POSTS_ERROR = "STORE_POSTS_ERROR";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const STORE_COMMENTS_SUCCESS = "STORE_COMMENTS_SUCCESS";
export const PASSING_SEARCH_TERM = 'PASSING_SEARCH_TERM'

export const createPost = post => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("posts")
      .add({
        ...post,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: Date.now()
      })
      .then(() => {
        dispatch({ type: CREATE_POST });
      })
      .catch(error => {
        dispatch({ type: CREATE_POST_ERROR, error });
      });
  };
};

export const deletePost = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_POST, id });
      });
  };
};

export const updatePost = (id, post) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .doc(id)
      .update(post)
      .then(() => {
        dispatch({ type: UPDATE_POST });
      });
  };
};

export const storePosts = () => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("storePosts has run");
    //  console.log(database.ref("posts"));
    const firestore = getFirestore();

    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        //  console.log(snapshot);
        dispatch({ type: STORE_POSTS_SUCCESS, payload: snapshot });
      })
      .catch(error => {
        dispatch({ type: STORE_POSTS_ERROR, error });
      });
  };
};

export const addComment = (postId, comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const userId = user.uid;
    const ref = firestore.doc("posts/" + postId);
    const subcollection = ref.collection("comments");

    subcollection.add({
      ...comment,
      postId: postId,
      uid: userId,
      authorFirstName: profile.firstName,
      createdAt: Date.now()
    });

    dispatch(storeComments(postId));
  };
};

export const storeComments = postId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const commentsRef = firestore
      .collection("posts")
      .doc(postId)
      .collection("comments");

    commentsRef.get().then(snapshot => {
      const comments = [];
      snapshot.forEach(doc => {
        console.log(doc.data());

        comments.push({
          id: doc.id,
          postId: doc.data().postId,
          uid: doc.data().userId,
          comment: doc.data().comment,
          authorFirstName: doc.data().authorFirstName,
          createdAt: doc.data().createdAt
        });
      });

      comments.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      console.log(comments);
      dispatch({ type: STORE_COMMENTS_SUCCESS, payload: comments });
    });
  };
};

export const passingSearchTerm = searchTerm => {
  return dispatch => {
    dispatch({ type: PASSING_SEARCH_TERM, payload: searchTerm });
  };
};
