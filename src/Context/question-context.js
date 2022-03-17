import React from "react";

const QuestionsCtx = React.createContext({
  questions: [],
  imageUrl:"",
  userIsLoggedIn:false,
  changeQuestionImage: (url) => {},
  setUserIsLoggedIn: () => {}
});

export default QuestionsCtx;
