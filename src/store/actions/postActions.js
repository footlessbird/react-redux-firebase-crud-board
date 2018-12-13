export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";

export const createPost = post => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("posts")
      .add({
        ...post,
        authorFirstName: "Sarah",
        authorLastName: "Brightman",
        authorId: 12345,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: CREATE_POST });
      })
      .catch(error => {
        dispatch({ type: CREATE_POST_ERROR }, error);
      });
  };
};
