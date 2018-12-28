export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const STORE_POSTS_SUCCESS = "STORE_POSTS_SUCCESS";
export const STORE_POSTS_ERROR = "STORE_POSTS_ERROR";

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
    const firestore = getFirestore();
    
    firestore
      .collection("posts")
      .get()
      .then(snapshot => {
        console.log(snapshot);
        dispatch({ type: STORE_POSTS_SUCCESS, payload: snapshot });
      })
      .catch(error => {
        dispatch({ type: STORE_POSTS_ERROR, error });
      });
  };
};
