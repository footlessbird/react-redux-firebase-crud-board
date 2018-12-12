import {CREATE_POST} from "../actions/postActions";

const initState = {
  posts: [
    { id: 1, title: "Canada", content: "it is in the North America" },
    { id: 2, title: "Frozen", content: "Let it go!!" },
    { id: 3, title: "Late night shift", content: "something just happened.." },
    { id: 4, title: "Deathcab for cutie", content: "what sarah said" },
    { id: 5, title: "Daniel", content: "I'm always watching you" },
    { id: 6, title: "apsfnasfo", content: "091840912074912414" },
    { id: 7, title: "qqqqqqq", content: "_+_(_)*)(^&*%*&%*&%" },
    { id: 8, title: "x", content: "xxxxxxxxxx" }
  ]
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_POST:
      console.log("post created", action.post);
  }

  return state;
};


export default postReducer;
